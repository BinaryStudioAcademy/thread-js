import { it, describe, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { config } from '../../../src/libs/packages/config/config.js';
import {
  ApiPath,
  HttpCode,
  HttpMethod,
  AuthApiPath,
  UserPayloadKey,
  UserValidationRule,
  UserValidationMessage
} from '../../../src/libs/enums/enums.js';
import {
  joinPath,
  normalizeTrailingSlash
} from '../../../src/libs/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(config.ENV.APP.API_PATH, ApiPath.AUTH)
)} routes`, () => {
  const app = buildApp();

  const registerEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.REGISTER)
  );

  const loginEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.LOGIN)
  );

  const userEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.USER)
  );

  describe(`${registerEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.USERNAME} validation error`, async () => {
      const response = await app.inject().post(registerEndpoint).body({});

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.USERNAME_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.USERNAME} validation error`, async () => {
      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          [UserPayloadKey.USERNAME]: faker.random.alpha(
            UserValidationRule.USERNAME_MIN_LENGTH - 1
          ),
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.PASSWORD]: faker.internet.password()
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.USERNAME_MIN_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.USERNAME} validation error`, async () => {
      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          [UserPayloadKey.USERNAME]: faker.random.alpha(
            UserValidationRule.USERNAME_MAX_LENGTH + 2
          ),
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.PASSWORD]: faker.internet.password()
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.USERNAME_MAX_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.EMAIL} validation error`, async () => {
      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          [UserPayloadKey.USERNAME]: faker.name.firstName(),
          [UserPayloadKey.PASSWORD]: faker.internet.password()
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.EMAIL_REQUIRE);
    });

    it(`should return ${HttpCode.BAD_REQUEST} of wrong ${UserPayloadKey.EMAIL} validation error`, async () => {
      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.name.firstName(),
          [UserPayloadKey.USERNAME]: faker.name.firstName(),
          [UserPayloadKey.PASSWORD]: faker.internet.password()
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.EMAIL_WRONG);
    });

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.USERNAME]: faker.name.firstName()
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.USERNAME]: faker.name.firstName(),
          [UserPayloadKey.PASSWORD]: faker.internet.password(
            UserValidationRule.PASSWORD_MIN_LENGTH - 2
          )
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_MIN_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.USERNAME]: faker.name.firstName(),
          [UserPayloadKey.PASSWORD]: faker.internet.password(
            UserValidationRule.PASSWORD_MAX_LENGTH + 2
          )
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_MAX_LENGTH
      );
    });

    it(`should return ${HttpCode.CREATED} and create a new user`, async () => {
      const testUser = {
        [UserPayloadKey.USERNAME]: faker.name.firstName(),
        [UserPayloadKey.EMAIL]: faker.internet.email(),
        [UserPayloadKey.PASSWORD]: faker.internet.password()
      };

      const response = await app.inject().post(registerEndpoint).body(testUser);

      expect(response.statusCode).toBe(HttpCode.CREATED);
      expect(response.json()).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            [UserPayloadKey.USERNAME]: testUser[UserPayloadKey.USERNAME],
            [UserPayloadKey.EMAIL]: testUser[UserPayloadKey.EMAIL]
          })
        })
      );
    });
  });

  describe(`${loginEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.EMAIL} validation error`, async () => {
      const response = await app.inject().post(loginEndpoint).body({});

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.EMAIL_REQUIRE);
    });

    it(`should return ${HttpCode.BAD_REQUEST} of wrong ${UserPayloadKey.EMAIL} validation error`, async () => {
      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({ [UserPayloadKey.EMAIL]: faker.name.fullName() });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.EMAIL_WRONG);
    });

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.internet.email()
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.PASSWORD]: faker.internet.password(
            UserValidationRule.PASSWORD_MIN_LENGTH - 2
          )
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_MIN_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: faker.internet.email(),
          [UserPayloadKey.PASSWORD]: faker.internet.password(
            UserValidationRule.PASSWORD_MAX_LENGTH + 2
          )
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(
        UserValidationMessage.PASSWORD_MAX_LENGTH
      );
    });

    it(`should return ${HttpCode.OK} with auth result`, async () => {
      const testUser = {
        [UserPayloadKey.USERNAME]: faker.name.firstName(),
        [UserPayloadKey.EMAIL]: faker.internet.email(),
        [UserPayloadKey.PASSWORD]: faker.internet.password()
      };

      await app.inject().post(registerEndpoint).body(testUser);

      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: testUser[UserPayloadKey.EMAIL],
          [UserPayloadKey.PASSWORD]: testUser[UserPayloadKey.PASSWORD]
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            [UserPayloadKey.USERNAME]: testUser[UserPayloadKey.USERNAME],
            [UserPayloadKey.EMAIL]: testUser[UserPayloadKey.EMAIL]
          })
        })
      );
    });
  });

  describe(`${userEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with auth user`, async () => {
      const testUser = {
        [UserPayloadKey.USERNAME]: faker.name.firstName(),
        [UserPayloadKey.EMAIL]: faker.internet.email(),
        [UserPayloadKey.PASSWORD]: faker.internet.password()
      };

      const registerResponse = await app
        .inject()
        .post(registerEndpoint)
        .body(testUser);

      const response = await app
        .inject()
        .get(userEndpoint)
        .headers({ authorization: `Bearer ${registerResponse.json().token}` });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          [UserPayloadKey.USERNAME]: testUser[UserPayloadKey.USERNAME],
          [UserPayloadKey.EMAIL]: testUser[UserPayloadKey.EMAIL]
        })
      );
    });
  });
});
