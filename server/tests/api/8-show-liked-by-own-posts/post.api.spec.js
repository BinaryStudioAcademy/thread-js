import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
  FilterUserMode,
  PostsApiPath,
  UserPayloadKey
} from '#libs/enums/enums.js';
import { config } from '#libs/packages/config/config.js';
import { DatabaseTableName } from '#libs/packages/database/database.js';
import { HttpCode, HttpHeader, HttpMethod } from '#libs/packages/http/http.js';

import {
  buildApp,
  getBearerAuthHeader,
  getCrudHandlers,
  getJoinedNormalizedPath,
  setupTestPosts,
  setupTestUsers
} from '../../helpers/helpers.js';
import { TEST_POSTS } from '../../helpers/setup-test-data/setup-test-posts/setup-test-posts.helper.js';
import { TEST_USERS_CREDENTIALS } from '../../helpers/setup-test-data/setup-test-users/setup-test-users.helper.js';
import { KNEX_SELECT_ONE_RECORD } from '../../libs/constants/constants.js';

const loginEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const postApiPath = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS
]);

const postsEndpoint = getJoinedNormalizedPath(
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.ROOT
);

const postReactEndpoint = getJoinedNormalizedPath(
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.REACT
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

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with liked by own posts`, async () => {
      const { id: postId } = await select({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      });

      await app
        .inject()
        .put(postReactEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token)
        })
        .body({ postId });

      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .query({
          from: 0,
          count: 1,
          userId,
          userMode: FilterUserMode.LIKED_BY_OWN
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          postId
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
