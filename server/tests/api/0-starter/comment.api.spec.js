import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
  CommentPayloadKey,
  CommentsApiPath,
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
  setupTestUsers
} from '../../helpers/helpers.js';
import {
  setupTestPosts,
  TEST_POSTS
} from '../../helpers/setup-test-data/setup-test-posts/setup-test-posts.helper.js';
import { TEST_USERS_CREDENTIALS } from '../../helpers/setup-test-data/setup-test-users/setup-test-users.helper.js';
import { KNEX_SELECT_ONE_RECORD } from '../../libs/constants/constants.js';

const loginEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const commentApiPath = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS
]);

const commentsEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS,
  CommentsApiPath.ROOT
]);

const commentIdEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS,
  CommentsApiPath.$ID
]);

describe(`${commentApiPath} routes`, () => {
  const { app, knex } = buildApp();
  const { select, insert } = getCrudHandlers(knex);

  let token;
  let userId;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });

    const [validTestUser] = TEST_USERS_CREDENTIALS;

    const loginResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
      });

    token = loginResponse.json().token;
    userId = loginResponse.json().user.id;
  });

  describe(`${commentsEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    it(`should return ${HttpCode.CREATED} with a new comment`, async () => {
      const [validTestPost] = TEST_POSTS;

      const { id: postId } = await select({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });

      const testComment = {
        ...validTestPost,
        postId
      };

      const response = await app
        .inject()
        .post(commentsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body(testComment);

      expect(response.statusCode).toBe(HttpCode.CREATED);
      expect(response.json()).toEqual(
        expect.objectContaining({
          userId,
          ...testComment
        })
      );
      expect(response.json()).toHaveProperty('id');
      expect(response.json()).toHaveProperty('createdAt');
      expect(response.json()).toHaveProperty('updatedAt');

      const savedDatabaseComment = await select({
        table: DatabaseTableName.COMMENTS,
        condition: { id: response.json().id },
        limit: KNEX_SELECT_ONE_RECORD
      });

      expect(savedDatabaseComment).toEqual(
        expect.objectContaining({
          [CommentPayloadKey.BODY]: testComment[CommentPayloadKey.BODY],
          postId: testComment.postId
        })
      );
    });
  });

  describe(`${commentIdEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with comment by id`, async () => {
      const { id: commentId, body } = await select({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      });

      const response = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          id: commentId,
          body
        })
      );
      expect(response.json()).toHaveProperty('createdAt');
      expect(response.json()).toHaveProperty('updatedAt');
    });
  });
});
