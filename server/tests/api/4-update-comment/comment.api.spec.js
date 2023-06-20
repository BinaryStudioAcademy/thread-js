import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
  CommentPayloadKey,
  CommentsApiPath,
  PostPayloadKey,
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
  setupTestComments,
  setupTestPosts,
  setupTestUsers
} from '../../helpers/helpers.js';
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

const commentIdEndpoint = getJoinedNormalizedPath(
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS,
  CommentsApiPath.$ID
);

describe(`${commentApiPath} routes`, () => {
  const { app, knex } = buildApp();
  const { select, insert } = getCrudHandlers(knex);

  let tokenMainUser;
  let tokenMinorUser;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });
    await setupTestComments({ handlers: { select, insert } });

    const [validTestMainUser, validTestMinorUser] = TEST_USERS_CREDENTIALS;

    const loginMainUserResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestMainUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestMainUser[UserPayloadKey.PASSWORD]
      });

    const loginMinorUserResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestMinorUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestMinorUser[UserPayloadKey.PASSWORD]
      });

    tokenMainUser = loginMainUserResponse.json().token;
    tokenMinorUser = loginMinorUserResponse.json().token;
  });

  describe(`${commentIdEndpoint} (${HttpMethod.PUT}) endpoint`, async () => {
    const comment = await select({
      table: DatabaseTableName.COMMENTS,
      limit: KNEX_SELECT_ONE_RECORD
    });

    it(`should return ${HttpCode.FORBIDDEN} with attempt to update comment by not own user`, async () => {
      const testUpdatedComment = {
        ...comment,
        [CommentPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const updateCommentResponse = await app
        .inject()
        .put(commentIdEndpoint.replace(':id', comment.id))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        })
        .body(testUpdatedComment);

      const getCommentResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', comment.id))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        });

      expect(updateCommentResponse.statusCode).toBe(HttpCode.FORBIDDEN);
      expect(getCommentResponse.json()).toEqual(comment);
    });

    it(`should return ${HttpCode.OK} with updated comment`, async () => {
      const testUpdatedComment = {
        ...comment,
        [CommentPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const updateCommentResponse = await app
        .inject()
        .put(commentIdEndpoint.replace(':id', comment.id))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        })
        .body(testUpdatedComment);

      expect(updateCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(updateCommentResponse.json()).toEqual(
        expect.objectContaining({
          id: testUpdatedComment.id,
          createdAt: testUpdatedComment.createdAt,
          [CommentPayloadKey.BODY]: testUpdatedComment[PostPayloadKey.BODY]
        })
      );
    });
  });
});
