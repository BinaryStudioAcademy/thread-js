import fs from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, it } from '@jest/globals';
import FormData from 'form-data';

import { ApiPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { HttpCode, HttpHeader, HttpMethod } from '~/libs/packages/http/http.js';
import { joinPath } from '~/libs/packages/path/path.js';
import {
  type UserLoginResponseDto,
  type UserRegisterRequestDto
} from '~/packages/auth/auth.js';
import { AuthApiPath } from '~/packages/auth/auth.js';
import { ImagePayloadKey, ImagesApiPath } from '~/packages/image/image.js';
import { type Image } from '~/packages/image/image.js';
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

const userApiPath = joinPath([config.ENV.APP.API_PATH, ApiPath.USERS]);

const userIdEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.USERS,
  UsersApiPath.$ID
]);

const imagesEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.IMAGES,
  ImagesApiPath.ROOT
]);

describe(`${userApiPath} routes`, () => {
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
        [UserPayloadKey.USERNAME]: faker.person.firstName()
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

    it(`should return ${HttpCode.OK} with updated user`, async () => {
      const formData = new FormData();

      formData.append(
        ImagePayloadKey.IMAGE,
        fs.createReadStream(
          join(
            fileURLToPath(import.meta.url),
            '../../../data/images/test-image.png'
          )
        )
      );

      const uploadImageResponse = await app
        .inject()
        .post(imagesEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser),
          ...formData.getHeaders()
        })
        .body(formData);

      const { id: imageId } = uploadImageResponse.json<Image>();
      const updatedMainUser = {
        ...userMain,
        [UserPayloadKey.USERNAME]: faker.person.firstName(),
        imageId
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
          imageId: updatedMainUser.imageId,
          [UserPayloadKey.USERNAME]: updatedMainUser[UserPayloadKey.USERNAME]
        })
      );
    });
  });
});
