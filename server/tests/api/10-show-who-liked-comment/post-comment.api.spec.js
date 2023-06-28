import { beforeAll, describe, expect, it } from '@jest/globals';

import { ApiPath } from '#libs/enums/enums.js';
import { config } from '#libs/packages/config/config.js';
import { DatabaseTableName } from '#libs/packages/database/database.js';
import { HttpCode, HttpHeader, HttpMethod } from '#libs/packages/http/http.js';
import { joinPath } from '#libs/packages/path/path.js';
import { AuthApiPath } from '#packages/auth/auth.js';
import { CommentsApiPath } from '#packages/comment/comment.js';
import { PostsApiPath } from '#packages/post/post.js';
import { UserPayloadKey } from '#packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import { getCrudHandlers } from '../../libs/packages/database/database.js';
import { getBearerAuthHeader } from '../../libs/packages/http/http.js';
import { setupTestComments } from '../../packages/comment/comment.js';
import { setupTestPosts } from '../../packages/post/post.js';
import {
  setupTestUsers,
  TEST_USERS_CREDENTIALS
} from '../../packages/user/user.js';

const loginEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const commentApiPath = joinPath([config.ENV.APP.API_PATH, ApiPath.COMMENTS]);

const postApiPath = joinPath([config.ENV.APP.API_PATH, ApiPath.POSTS]);

const postIdEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.$ID
]);

const commentReactEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS,
  CommentsApiPath.REACT
]);

const commentIdEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS,
  CommentsApiPath.$ID
]);

describe(`${commentApiPath} and ${postApiPath} routes`, () => {
  const { getApp, getKnex } = buildApp();
  const { select, insert } = getCrudHandlers(getKnex);

  const app = getApp();

  let token;
  let userId;

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

  describe(`${commentIdEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with likes and dislikes of comment`, async () => {
      const [{ id: firstCommentId }, { id: secondCommentId }] = await select({
        table: DatabaseTableName.COMMENTS
      });

      const firstResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', firstCommentId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      const secondResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', secondCommentId))
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

  describe(`${postIdEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with likes and dislikes of post's comment`, async () => {
      const [
        { id: firstCommentId, firstPostId },
        { id: secondCommentId, secondPostId }
      ] = await select({ table: DatabaseTableName.COMMENTS });

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
