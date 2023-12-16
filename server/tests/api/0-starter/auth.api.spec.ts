import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';

import { ApiPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { HttpCode, HttpHeader, HttpMethod } from '~/libs/packages/http/http.js';
import { joinPath } from '~/libs/packages/path/path.js';
import {
  AuthApiPath,
  type UserLoginResponseDto,
  type UserRegisterRequestDto
} from '~/packages/auth/auth.js';
import {
  UserPayloadKey,
  UserValidationMessage,
  UserValidationRule
} from '~/packages/user/user.js';
import { type User } from '~/packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import {
  getCrudHandlers,
  KNEX_SELECT_ONE_RECORD
} from '../../libs/packages/database/database.js';
import { getBearerAuthHeader } from '../../libs/packages/http/http.js';
import { TEST_USERS_CREDENTIALS } from '../../packages/user/user.js';

const authApiPath = joinPath([config.ENV.APP.API_PATH, ApiPath.AUTH]);

const registerEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.REGISTER
]);

const loginEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const userEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.USER
]);

describe(`${authApiPath} routes`, () => {
  const { getApp, getKnex } = buildApp();
  const { select } = getCrudHandlers(getKnex);

  describe(`${registerEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    const app = getApp();

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.USERNAME} validation error`, async () => {
      const response = await app.inject().post(registerEndpoint).body({});

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.USERNAME_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.USERNAME} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS;

      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          ...validTestUser,
          [UserPayloadKey.USERNAME]: faker.string.alpha(
            UserValidationRule.USERNAME_MIN_LENGTH - 1
          )
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.USERNAME_MIN_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.USERNAME} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS;

      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          ...validTestUser,
          [UserPayloadKey.USERNAME]: faker.string.alpha(
            UserValidationRule.USERNAME_MAX_LENGTH + 2
          )
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.USERNAME_MAX_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.EMAIL} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS;
      const { [UserPayloadKey.EMAIL]: _email, ...user } =
        validTestUser as UserRegisterRequestDto;

      const response = await app.inject().post(registerEndpoint).body(user);

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.EMAIL_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of wrong ${UserPayloadKey.EMAIL} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS;

      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          ...validTestUser,
          [UserPayloadKey.EMAIL]: faker.person.firstName()
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.EMAIL_WRONG
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS;
      const { [UserPayloadKey.PASSWORD]: _password, ...user } =
        validTestUser as UserRegisterRequestDto;

      const response = await app.inject().post(registerEndpoint).body(user);

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.PASSWORD_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS;

      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          ...validTestUser,
          [UserPayloadKey.PASSWORD]: faker.internet.password({
            length: UserValidationRule.PASSWORD_MIN_LENGTH - 2
          })
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.PASSWORD_MIN_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS;

      const response = await app
        .inject()
        .post(registerEndpoint)
        .body({
          ...validTestUser,
          [UserPayloadKey.PASSWORD]: faker.internet.password({
            length: UserValidationRule.PASSWORD_MAX_LENGTH + 2
          })
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.PASSWORD_MAX_LENGTH
      );
    });

    it(`should return ${HttpCode.CREATED} and create a new user`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS as [
        UserRegisterRequestDto
      ];

      const response = await app
        .inject()
        .post(registerEndpoint)
        .body(validTestUser);

      expect(response.statusCode).toBe(HttpCode.CREATED);
      expect(response.json()).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            [UserPayloadKey.USERNAME]: validTestUser[UserPayloadKey.USERNAME],
            [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL]
          })
        })
      );

      const savedDatabaseUser = await select({
        table: DatabaseTableName.USERS,
        condition: { id: response.json<UserLoginResponseDto>().user.id },
        limit: KNEX_SELECT_ONE_RECORD
      });

      expect(savedDatabaseUser).toEqual(
        expect.objectContaining({
          [UserPayloadKey.USERNAME]: validTestUser[UserPayloadKey.USERNAME],
          [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL]
        })
      );
    });
  });

  describe(`${loginEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    const app = getApp();

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.EMAIL} validation error`, async () => {
      const response = await app.inject().post(loginEndpoint).body({});

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.EMAIL_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of wrong ${UserPayloadKey.EMAIL} validation error`, async () => {
      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({ [UserPayloadKey.EMAIL]: faker.person.fullName() });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.EMAIL_WRONG
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of empty ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS as [
        UserRegisterRequestDto
      ];

      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL]
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.PASSWORD_REQUIRE
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too short ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS as [
        UserRegisterRequestDto
      ];

      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
          [UserPayloadKey.PASSWORD]: faker.internet.password({
            length: UserValidationRule.PASSWORD_MIN_LENGTH - 2
          })
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.PASSWORD_MIN_LENGTH
      );
    });

    it(`should return ${HttpCode.BAD_REQUEST} of too long ${UserPayloadKey.PASSWORD} validation error`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS as [
        UserRegisterRequestDto
      ];

      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
          [UserPayloadKey.PASSWORD]: faker.internet.password({
            length: UserValidationRule.PASSWORD_MAX_LENGTH + 2
          })
        });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json<Record<'message', string>>().message).toBe(
        UserValidationMessage.PASSWORD_MAX_LENGTH
      );
    });

    it(`should return ${HttpCode.OK} with auth result`, async () => {
      const [validTestUser] = TEST_USERS_CREDENTIALS as [
        UserRegisterRequestDto
      ];

      const response = await app
        .inject()
        .post(loginEndpoint)
        .body({
          [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
          [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            [UserPayloadKey.USERNAME]: validTestUser[UserPayloadKey.USERNAME],
            [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL]
          })
        })
      );
    });
  });

  describe(`${userEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    const app = getApp();

    it(`should return ${HttpCode.OK} with auth user`, async () => {
      const [{ email, username, password }] = TEST_USERS_CREDENTIALS as [
        UserRegisterRequestDto
      ];

      const loginResponse = await app
        .inject()
        .post(loginEndpoint)
        .body({ email, password });

      const response = await app
        .inject()
        .get(userEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(
            loginResponse.json<UserLoginResponseDto>().token
          )
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          username,
          email
        })
      );

      const databaseUser = await select({
        table: DatabaseTableName.USERS,
        condition: { id: response.json<User>().id },
        limit: KNEX_SELECT_ONE_RECORD
      });

      expect(databaseUser).toEqual(
        expect.objectContaining({
          id: response.json<User>().id,
          username,
          email
        })
      );
    });
  });
});
