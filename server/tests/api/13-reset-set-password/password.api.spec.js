import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
  HttpCode,
  PasswordApiPath,
  UserPayloadKey
} from '#libs/enums/enums.js';
import { joinPath, normalizeTrailingSlash } from '#libs/helpers/helpers.js';
import { config } from '#libs/packages/config/config.js';
import {
  UserValidationMessage,
  UserValidationRule
} from '#packages/user/user.js';

import {
  buildApp,
  getCrudHandlers,
  getJoinedNormalizedPath,
  setupTestUsers
} from '../../helpers/helpers.js';
import { TEST_USERS_CREDENTIALS } from '../../helpers/setup-test-data/setup-test-users/setup-test-users.helper.js';

const loginEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const resetPasswordEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.PASSWORD,
  PasswordApiPath.RESET
]);

const setPasswordEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.PASSWORD,
  PasswordApiPath.SET
]);

describe(`${normalizeTrailingSlash(
  joinPath(config.ENV.APP.API_PATH, ApiPath.PASSWORD)
)} routes`, () => {
  const { app, knex } = buildApp();
  const { insert } = getCrudHandlers(knex);

  let user;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    const [validTestUser] = TEST_USERS_CREDENTIALS;

    const loginUserResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
      });

    user = loginUserResponse.json().user;
  });

  describe(`${resetPasswordEndpoint} endpoint`, () => {
    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.EMAIL} validation error`, async () => {
      const response = await app.inject().post(resetPasswordEndpoint).body({});

      expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.EMAIL_REQUIRE);
    });

    it(`should return ${HttpCode.BAD_REQUEST} of wrong ${UserPayloadKey.EMAIL} validation error`, async () => {
      const response = await app
        .inject()
        .post(resetPasswordEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.person.firstName()
        });

      expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.EMAIL_WRONG);
    });

    it(`should return ${HttpCode.NOT_FOUND} if email not exists`, async () => {
      const response = await app
        .inject()
        .post(resetPasswordEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.internet.email()
        });

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
      expect(response.json().message).toBe(
        UserValidationMessage.USER_WITH_EMAIL_NOT_FOUND
      );
    });

    it(`should return ${HttpCode.OK} with token`, async () => {
      const response = await app
        .inject()
        .post(resetPasswordEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: user[UserPayloadKey.EMAIL]
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toHaveProperty(UserPayloadKey.TOKEN);
    });
  });

  describe(`${setPasswordEndpoint} endpoint`, () => {
    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.TOKEN} validation error`, async () => {
      const response = await app.inject().post(setPasswordEndpoint).body({});

      expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.TOKEN_REQUIRE);
    });

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(setPasswordEndpoint)
        .body({
          [UserPayloadKey.TOKEN]: faker.string.sample()
        });

      expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(setPasswordEndpoint)
        .body({
          [UserPayloadKey.TOKEN]: faker.string.sample(),
          [UserPayloadKey.PASSWORD]: faker.internet.password({
            length: UserValidationRule.PASSWORD_MIN_LENGTH - 2
          })
        });

      expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_MIN_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(setPasswordEndpoint)
        .body({
          [UserPayloadKey.TOKEN]: faker.string.sample(),
          [UserPayloadKey.PASSWORD]: faker.internet.password({
            length: UserValidationRule.PASSWORD_MAX_LENGTH + 2
          })
        });

      expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_MAX_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of invalid ${UserPayloadKey.TOKEN} validation error`, async () => {
      const response = await app
        .inject()
        .post(setPasswordEndpoint)
        .body({
          [UserPayloadKey.TOKEN]: faker.string.sample(),
          [UserPayloadKey.PASSWORD]: faker.internet.password()
        });

      expect(response.json().statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.INVALID_TOKEN);
    });

    it(`should return ${HttpCode.OK} with auth result`, async () => {
      const resetPasswordResponse = await app
        .inject()
        .post(resetPasswordEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: user[UserPayloadKey.EMAIL]
        });

      const newPassword = faker.internet.password();

      const setPasswordResponse = await app
        .inject()
        .post(setPasswordEndpoint)
        .body({
          [UserPayloadKey.TOKEN]: resetPasswordResponse.json().token,
          [UserPayloadKey.PASSWORD]: newPassword
        });

      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: user[UserPayloadKey.EMAIL],
          [UserPayloadKey.PASSWORD]: newPassword
        });

      expect(setPasswordResponse.statusCode).toBe(HttpCode.OK);
      expect(response.statusCode).toBe(HttpCode.OK);
    });
  });
});
