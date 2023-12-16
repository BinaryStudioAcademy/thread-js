import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, it } from '@jest/globals';

import { ApiPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { HttpCode, HttpHeader, HttpMethod } from '~/libs/packages/http/http.js';
import { joinPath } from '~/libs/packages/path/path.js';
import {
  type UserLoginResponseDto,
  type UserRegisterRequestDto
} from '~/packages/auth/auth.js';
import { AuthApiPath } from '~/packages/auth/auth.js';
import {
  type UserAuthResponse,
  UserPayloadKey,
  UsersApiPath
} from '~/packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import { getCrudHandlers } from '../../libs/packages/database/database.js';
import { getBearerAuthHeader } from '../../libs/packages/http/http.js';
import {
  setupTestUsers,
  TEST_USERS_CREDENTIALS
} from '../../packages/user/user.js';

const loginEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const authApiPath = joinPath([config.ENV.APP.API_PATH, ApiPath.AUTH]);

const userApiPath = joinPath([config.ENV.APP.API_PATH, ApiPath.USERS]);

const userIdEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.USERS,
  UsersApiPath.$ID
]);

const authUserEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.USER
]);

describe(`${userApiPath} and ${authApiPath} routes`, () => {
  const { getApp, getKnex } = buildApp();
  const { insert } = getCrudHandlers(getKnex);

  const app = getApp();

  let tokenMainUser: string;
  let tokenMinorUser: string;
  let userMain: UserAuthResponse;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });

    const [validTestMainUser, validTestMinorUser] = TEST_USERS_CREDENTIALS as [
      UserRegisterRequestDto,
      UserRegisterRequestDto
    ];

    const loginMainUserResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestMainUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestMainUser[UserPayloadKey.PASSWORD]
      });

    const loginMinorUserResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestMinorUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestMinorUser[UserPayloadKey.PASSWORD]
      });

    tokenMainUser = loginMainUserResponse.json<UserLoginResponseDto>().token;
    tokenMinorUser = loginMinorUserResponse.json<UserLoginResponseDto>().token;
    userMain = loginMainUserResponse.json<UserLoginResponseDto>().user;
  });

  describe(`${userIdEndpoint} (${HttpMethod.PUT}) endpoint`, () => {
    it(`should return ${HttpCode.FORBIDDEN} with attempt to update user by not own one`, async () => {
      const updatedMainUser = {
        ...userMain,
        [UserPayloadKey.STATUS]: faker.lorem.words()
      };

      const updateUserResponse = await app
        .inject()
        .put(userIdEndpoint.replace(':id', userMain.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        })
        .body(updatedMainUser);

      const getUserResponse = await app
        .inject()
        .get(userIdEndpoint.replace(':id', userMain.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        });

      expect(updateUserResponse.statusCode).toBe(HttpCode.FORBIDDEN);
      expect(getUserResponse.json()).toEqual(userMain);
    });

    it(`should return ${HttpCode.OK} with user's status`, async () => {
      const updatedMainUser = {
        ...userMain,
        [UserPayloadKey.STATUS]: faker.lorem.words()
      };
      const response = await app
        .inject()
        .put(userIdEndpoint.replace(':id', userMain.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        })
        .body(updatedMainUser);

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          id: userMain.id,
          [UserPayloadKey.STATUS]: updatedMainUser[UserPayloadKey.STATUS]
        })
      );
    });
  });

  describe(`${authUserEndpoint} endpoints`, () => {
    it(`should return ${HttpCode.OK} with auth user`, async () => {
      const response = await app
        .inject()
        .get(authUserEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({ id: userMain.id })
      );
      expect(response.json()).toHaveProperty('status');
    });
  });
});
