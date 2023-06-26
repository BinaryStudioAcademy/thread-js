import { beforeAll, describe, expect, it } from '@jest/globals';

import { ApiPath } from '#libs/enums/enums.js';
import { config } from '#libs/packages/config/config.js';
import { HttpCode, HttpHeader, HttpMethod } from '#libs/packages/http/http.js';
import { joinPath } from '#libs/packages/path/path.js';
import { AuthApiPath } from '#packages/auth/auth.js';
import { PostsApiPath } from '#packages/post/post.js';
import { FilterUserMode, UserPayloadKey } from '#packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import { getCrudHandlers } from '../../libs/packages/database/database.js';
import { getBearerAuthHeader } from '../../libs/packages/http/http.js';
import { setupTestPosts, TEST_POSTS } from '../../packages/post/post.js';
import {
  setupTestUsers,
  TEST_USERS_CREDENTIALS
} from '../../packages/user/user.js';

const loginEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const postApiPath = joinPath([config.ENV.APP.API_PATH, ApiPath.POSTS]);

const postsEndpoint = joinPath(
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.ROOT
);

describe(`${postApiPath} routes`, () => {
  const { app, knex } = buildApp();
  const { select, insert } = getCrudHandlers(knex);

  let token;
  let userId;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });

    const [validUser] = TEST_USERS_CREDENTIALS;

    const loginResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validUser[UserPayloadKey.PASSWORD]
      });

    token = loginResponse.json().token;
    userId = loginResponse.json().user.id;
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, async () => {
    it(`should return ${HttpCode.OK} with own posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token)
        })
        .query({
          from: 0,
          count: 1,
          userId,
          userMode: FilterUserMode.INCLUDE
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          userId
        })
      ]);
    });

    it(`should return ${HttpCode.OK} with not own posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token)
        })
        .query({
          from: 0,
          count: 1,
          userId,
          userMode: FilterUserMode.EXCLUDE
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          userId: expect.not.stringContaining(userId)
        })
      ]);
    });

    it(`should return ${HttpCode.OK} with all users' posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .query({
          from: 0,
          count: TEST_POSTS.length
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          userId: expect.not.stringContaining(userId)
        }),
        expect.objectContaining({
          userId
        })
      ]);
    });
  });
});
