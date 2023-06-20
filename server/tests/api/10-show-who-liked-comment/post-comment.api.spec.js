import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
  CommentsApiPath,
  PostsApiPath,
  UserPayloadKey
} from '#libs/enums/enums.js';
import { joinPath, normalizeTrailingSlash } from '#libs/helpers/helpers.js';
import { config } from '#libs/packages/config/config.js';
import { DatabaseTableName } from '#libs/packages/database/database.js';
import { HttpCode, HttpHeader, HttpMethod } from '#libs/packages/http/http.js';

import {
  buildApp,
  getBearerAuthHeader,
  getCrudHandlers,
  getJoinedNormalizedPath,
  setupTestComments,
  setupTestPosts,
  setupTestUsers
} from '../../helpers/helpers.js';
import { TEST_USERS_CREDENTIALS } from '../../helpers/setup-test-data/setup-test-users/setup-test-users.helper.js';

const loginEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const commentApiPath = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS
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

describe(`${commentApiPath} and ${postApiPath} routes`, () => {
  const { app, knex } = buildApp();
  const { select, insert } = getCrudHandlers(knex);

  let token;
  let userId;

  const postEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.$ID)
  );

  const commentReactEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.COMMENTS, CommentsApiPath.REACT)
  );

  const commentEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.COMMENTS, CommentsApiPath.$ID)
  );

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });
    await setupTestComments({ handlers: { select, insert } });

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

    const [{ id: firstCommentId }, { id: secondCommentId }] = await select({
      table: DatabaseTableName.POSTS
    });

    await app
      .inject()
      .put(commentReactEndpoint)
      .headers({
        [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token)
      })
      .body({ commentId: firstCommentId });
    await app
      .inject()
      .put(commentReactEndpoint)
      .headers({
        [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token)
      })
      .body({ postId: secondCommentId, isLike: false });
  });

  describe(`${commentEndpoint} (${HttpMethod.GET}) endpoint`, async () => {
    const [{ id: firstCommentId }, { id: secondCommentId }] = await select({
      table: DatabaseTableName.COMMENTS
    });

    it(`should return ${HttpCode.OK} with likes and dislikes of comment`, async () => {
      const firstResponse = await app
        .inject()
        .get(commentEndpoint.replace(':id', firstCommentId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      const secondResponse = await app
        .inject()
        .get(commentEndpoint.replace(':id', secondCommentId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      expect(firstResponse.statusCode).toBe(HttpCode.OK);
      expect(firstResponse.json()).toEqual(
        expect.objectContaining({
          id: firstCommentId,
          likes: expect.arrayContaining([expect.objectContaining({ userId })]),
          dislikes: []
        })
      );

      expect(secondResponse.statusCode).toBe(HttpCode.OK);
      expect(secondResponse.json()).toEqual(
        expect.objectContaining({
          id: secondCommentId,
          likes: [],
          dislikes: expect.arrayContaining([
            expect.objectContaining({ userId })
          ])
        })
      );
    });
  });

  describe(`${postEndpoint} (${HttpMethod.GET}) endpoint`, async () => {
    const [
      { id: firstCommentId, firstPostId },
      { id: secondCommentId, secondPostId }
    ] = await select({ table: DatabaseTableName.COMMENTS });

    it(`should return ${HttpCode.OK} with likes and dislikes of post's comment`, async () => {
      const firstPostResponse = await app
        .inject()
        .get(postEndpoint.replace(':id', firstPostId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      const secondPostResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', secondPostId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      expect(firstPostResponse.statusCode).toBe(HttpCode.OK);
      expect(firstPostResponse.json()).toEqual(
        expect.objectContaining({
          id: firstPostId,
          comments: expect.arrayContaining([
            expect.objectContaining({
              id: firstCommentId,
              likes: expect.arrayContaining([
                expect.objectContaining({ userId })
              ]),
              dislikes: []
            })
          ])
        })
      );

      expect(secondPostResponse.statusCode).toBe(HttpCode.OK);
      expect(secondPostResponse.json()).toEqual(
        expect.objectContaining({
          id: secondPostId,
          comments: expect.arrayContaining([
            expect.objectContaining({
              id: secondCommentId,
              likes: [],
              dilikes: expect.arrayContaining([
                expect.objectContaining({ userId })
              ])
            })
          ])
        })
      );
    });
  });
});
