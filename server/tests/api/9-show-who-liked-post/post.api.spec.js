import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
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
import { TEST_USERS_CREDENTIALS } from '../../helpers/setup-test-data/setup-test-users/setup-test-users.helper.js';

const loginEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const postApiPath = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS
]);

const postIdEndpoint = getJoinedNormalizedPath(
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.$ID
);

const postReactEndpoint = getJoinedNormalizedPath(
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.REACT
);

const postsEndpoint = getJoinedNormalizedPath(
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

    const [validTestUser] = TEST_USERS_CREDENTIALS;

    const loginUserResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
      });

    token = loginUserResponse.json().token;
    userId = loginUserResponse.json().user.id;

    const [{ id: firstPostId }, { id: secondPostId }] = await select({
      table: DatabaseTableName.POSTS
    });

    await app
      .inject()
      .put(postReactEndpoint)
      .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
      .body({ postId: firstPostId });
    await app
      .inject()
      .put(postReactEndpoint)
      .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
      .body({ postId: secondPostId, isLike: false });
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, async () => {
    const [{ id: firstPostId }, { id: secondPostId }] = await select({
      table: DatabaseTableName.POSTS
    });

    it(`should return ${HttpCode.OK} with likes and dislikes of posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          id: firstPostId,
          likes: [],
          dislikes: expect.arrayContaining([
            expect.objectContaining({ userId })
          ])
        }),
        expect.objectContaining({
          id: secondPostId,
          likes: expect.arrayContaining([expect.objectContaining({ userId })]),
          dislikes: []
        })
      ]);
    });
  });

  describe(`${postIdEndpoint} (${HttpMethod.GET}) endpoint`, async () => {
    const [{ id: firstPostId }, { id: secondPostId }] = await select({
      table: DatabaseTableName.POSTS
    });

    it(`should return ${HttpCode.OK} with likes and dislikes of post`, async () => {
      const firstPostResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', firstPostId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      const secondPostResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', secondPostId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      expect(firstPostResponse.statusCode).toBe(HttpCode.OK);
      expect(firstPostResponse.json()).toEqual(
        expect.objectContaining({
          id: firstPostId,
          likes: expect.arrayContaining([expect.objectContaining({ userId })]),
          dislikes: []
        })
      );

      expect(secondPostResponse.statusCode).toBe(HttpCode.OK);
      expect(secondPostResponse.json()).toEqual(
        expect.objectContaining({
          id: secondPostId,
          likes: [],
          dislikes: expect.arrayContaining([
            expect.objectContaining({ userId })
          ])
        })
      );
    });
  });
});
