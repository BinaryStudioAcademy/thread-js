import { it, describe, expect, beforeAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import FormData from 'form-data';
import fs from 'fs';
import {
  ENV,
  ApiPath,
  HttpCode,
  HttpMethod,
  AuthApiPath,
  ImagesApiPath,
  UserPayloadKey,
  ImagePayloadKey
} from '../../../src/common/enums/enums.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${ENV.APP.API_PATH}${ApiPath.IMAGES} routes`, () => {
  const app = buildApp();
  let token;

  beforeAll(async () => {
    const testUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const registerResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
      )
      .body(testUser);

    token = registerResponse.json().token;
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.IMAGES}${ImagesApiPath.ROOT} (${HttpMethod.POST}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with uploaded image`,
        async () => {
          const formData = new FormData();

          formData.append(ImagePayloadKey.IMAGE, fs.createReadStream(
            new URL('../../data/images/test-image.png', import.meta.url).pathname
          ));

          const response = await app.inject()
            .post(
              `${ENV.APP.API_PATH}${ApiPath.IMAGES}${ImagesApiPath.ROOT}`
            )
            .headers({ authorization: `Bearer ${token}`, ...formData.getHeaders() })
            .body(formData);

          expect(response.statusCode).toBe(HttpCode.OK);
          expect(response.json()).toHaveProperty('id');
          expect(response.json()).toHaveProperty('link');
          expect(response.json()).toHaveProperty('createdAt');
          expect(response.json()).toHaveProperty('updatedAt');
        }
      );
    }
  );
});
