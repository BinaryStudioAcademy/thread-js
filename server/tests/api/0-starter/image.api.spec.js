import fs from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { beforeAll, describe, expect, it } from '@jest/globals';
import FormData from 'form-data';

import { ApiPath } from '#libs/enums/enums.js';
import { config } from '#libs/packages/config/config.js';
import { DatabaseTableName } from '#libs/packages/database/database.js';
import { HttpCode, HttpHeader, HttpMethod } from '#libs/packages/http/http.js';
import { AuthApiPath } from '#packages/auth/auth.js';
import { ImagePayloadKey, ImagesApiPath } from '#packages/image/image.js';
import { UserPayloadKey } from '#packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import {
  getCrudHandlers,
  KNEX_SELECT_ONE_RECORD
} from '../../libs/packages/database/database.js';
import { getBearerAuthHeader } from '../../libs/packages/http/http.js';
import { getJoinedNormalizedPath } from '../../libs/packages/path/path.js';
import {
  setupTestUsers,
  TEST_USERS_CREDENTIALS
} from '../../packages/user/user.js';

const loginEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const imageEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.IMAGES
]);

const imagesEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.IMAGES,
  ImagesApiPath.ROOT
]);

describe(`${imageEndpoint} routes`, () => {
  const { app, knex } = buildApp();
  const { select, insert } = getCrudHandlers(knex);

  let token;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });

    const [validTestUser] = TEST_USERS_CREDENTIALS;

    const loginResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
      });

    token = loginResponse.json().token;
  });

  describe(`${imagesEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with uploaded image`, async () => {
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

      const response = await app
        .inject()
        .post(imagesEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token),
          ...formData.getHeaders()
        })
        .body(formData);

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toHaveProperty('id');
      expect(response.json()).toHaveProperty('link');
      expect(response.json()).toHaveProperty('createdAt');
      expect(response.json()).toHaveProperty('updatedAt');

      const savedDatabaseImage = await select({
        table: DatabaseTableName.IMAGES,
        condition: { id: response.json().id },
        limit: KNEX_SELECT_ONE_RECORD
      });

      expect(savedDatabaseImage).toEqual(
        expect.objectContaining({
          id: response.json().id,
          link: response.json().link
        })
      );
    });
  });
});
