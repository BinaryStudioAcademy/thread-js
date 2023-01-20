import { it, describe, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import FormData from 'form-data';
import { faker } from '@faker-js/faker';
import {
  ENV,
  ApiPath,
  HttpCode,
  HttpMethod,
  AuthApiPath,
  UsersApiPath,
  ImagesApiPath,
  UserPayloadKey,
  ImagePayloadKey
} from '../../../src/common/enums/enums.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${ENV.APP.API_PATH}${ApiPath.USERS} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let userMain;

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

    const registerMainUserResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
      )
      .body(testMainUser);

    const registerMinorUserResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
      )
      .body(testMinorUser);

    tokenMainUser = registerMainUserResponse.json().token;
    tokenMinorUser = registerMinorUserResponse.json().token;
    userMain = registerMainUserResponse.json().user;
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.USERS}${UsersApiPath.$ID} (${HttpMethod.PUT}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with updated user`,
        async () => {
          const formData = new FormData();

          formData.append(ImagePayloadKey.IMAGE, fs.createReadStream(
            new URL('../../data/images/test-image.png', import.meta.url).pathname
          ));

          const uploadImageResponse = await app.inject()
            .post(
              `${ENV.APP.API_PATH}${ApiPath.IMAGES}${ImagesApiPath.ROOT}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}`, ...formData.getHeaders() })
            .body(formData);

          const { id: imageId } = uploadImageResponse.json();
          const updatedMainUser = {
            ...userMain,
            [UserPayloadKey.USERNAME]: faker.name.firstName(),
            imageId
          };
          const response = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.USERS}${UsersApiPath.$ID.replace(
                ':id',
                userMain.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` })
            .body(updatedMainUser);

          expect(response.statusCode).toBe(HttpCode.OK);
          expect(response.json()).toEqual(expect.objectContaining({
            id: userMain.id,
            imageId: updatedMainUser.imageId,
            [UserPayloadKey.USERNAME]: updatedMainUser[UserPayloadKey.USERNAME]
          }));
        }
      );

      it(
        `should return ${HttpCode.FORBIDDEN} with attempt to update user by not own one`,
        async () => {
          const updatedMainUser = {
            ...userMain,
            [UserPayloadKey.USERNAME]: faker.name.firstName()
          };

          const updateUserResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.USERS}${UsersApiPath.$ID.replace(
                ':id',
                userMain.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMinorUser}` })
            .body(updatedMainUser);

          const getUserResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.USERS}${UsersApiPath.$ID.replace(
                ':id',
                userMain.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMinorUser}` });

          expect(updateUserResponse.statusCode).toBe(HttpCode.FORBIDDEN);
          expect(getUserResponse.json()).toEqual(userMain);
        }
      );
    }
  );
});
