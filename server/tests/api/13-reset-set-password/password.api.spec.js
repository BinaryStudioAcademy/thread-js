import { it, describe, expect, beforeAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import {
  ENV,
  ApiPath,
  HttpCode,
  AuthApiPath,
  UserPayloadKey,
  PasswordApiPath,
  UserValidationRule,
  UserValidationMessage
} from '../../../src/libs/enums/enums.js';
import {
  joinPath,
  normalizeTrailingSlash
} from '../../../src/libs/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(ENV.APP.API_PATH, ApiPath.PASSWORD)
)} routes`, () => {
  const app = buildApp();
  let user;

  const registerEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.REGISTER)
  );

  beforeAll(async () => {
    const testUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const registerMainUserResponse = await app
      .inject()
      .post(registerEndpoint)
      .body(testUser);

    user = registerMainUserResponse.json().user;
  });

  const resetPasswordEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.PASSWORD, PasswordApiPath.RESET)
  );

  const setPasswordEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.PASSWORD, PasswordApiPath.SET)
  );

  const loginEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.LOGIN)
  );

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
          [UserPayloadKey.EMAIL]: faker.name.firstName()
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
          [UserPayloadKey.TOKEN]: faker.datatype.string()
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
          [UserPayloadKey.TOKEN]: faker.datatype.string(),
          [UserPayloadKey.PASSWORD]: faker.internet.password(
            UserValidationRule.PASSWORD_MIN_LENGTH - 2
          )
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
          [UserPayloadKey.TOKEN]: faker.datatype.string(),
          [UserPayloadKey.PASSWORD]: faker.internet.password(
            UserValidationRule.PASSWORD_MAX_LENGTH + 2
          )
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
          [UserPayloadKey.TOKEN]: faker.datatype.string(),
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
