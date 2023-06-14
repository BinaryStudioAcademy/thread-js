import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { it, describe, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import FormData from 'form-data';
import { faker } from '@faker-js/faker';
import { config } from '#libs/packages/config/config.js';
import {
  ApiPath,
  HttpCode,
  HttpMethod,
  AuthApiPath,
  UsersApiPath,
  ImagesApiPath,
  UserPayloadKey,
  ImagePayloadKey
} from '#libs/enums/enums.js';
import { joinPath, normalizeTrailingSlash } from '#libs/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(config.ENV.APP.API_PATH, ApiPath.USERS)
)} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let userMain;

  const registerEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.REGISTER)
  );

  const userEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.USERS, UsersApiPath.$ID)
  );

  const imagesEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.IMAGES, ImagesApiPath.$ID)
  );

  beforeAll(async () => {
    const testMainUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const testMinorUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const registerMainUserResponse = await app
      .inject()
      .post(registerEndpoint)
      .body(testMainUser);

    const registerMinorUserResponse = await app
      .inject()
      .post(registerEndpoint)
      .body(testMinorUser);

    tokenMainUser = registerMainUserResponse.json().token;
    tokenMinorUser = registerMinorUserResponse.json().token;
    userMain = registerMainUserResponse.json().user;
  });

  describe(`${userEndpoint} (${HttpMethod.PUT}) endpoint`, () => {
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
          authorization: `Bearer ${tokenMainUser}`,
          ...formData.getHeaders()
        })
        .body(formData);

      const { id: imageId } = uploadImageResponse.json();
      const updatedMainUser = {
        ...userMain,
        [UserPayloadKey.USERNAME]: faker.name.firstName(),
        imageId
      };
      const response = await app
        .inject()
        .put(userEndpoint.replace(':id', userMain.id))
        .headers({ authorization: `Bearer ${tokenMainUser}` })
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

    it(`should return ${HttpCode.FORBIDDEN} with attempt to update user by not own one`, async () => {
      const updatedMainUser = {
        ...userMain,
        [UserPayloadKey.USERNAME]: faker.name.firstName()
      };

      const updateUserResponse = await app
        .inject()
        .put(userEndpoint.replace(':id', userMain.id))
        .headers({ authorization: `Bearer ${tokenMinorUser}` })
        .body(updatedMainUser);

      const getUserResponse = await app
        .inject()
        .get(userEndpoint.replace(':id', userMain.id))
        .headers({ authorization: `Bearer ${tokenMinorUser}` });

      expect(updateUserResponse.statusCode).toBe(HttpCode.FORBIDDEN);
      expect(getUserResponse.json()).toEqual(userMain);
    });
  });
});
