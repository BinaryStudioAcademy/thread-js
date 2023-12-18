import { beforeAll, describe, expect, it } from '@jest/globals';

import { ApiPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { HttpCode, HttpHeader, HttpMethod } from '~/libs/packages/http/http.js';
import { joinPath } from '~/libs/packages/path/path.js';
import {
  type UserLoginResponseDto,
  type UserRegisterRequestDto
} from '~/packages/auth/auth.js';
import { AuthApiPath } from '~/packages/auth/auth.js';
import { type Comment, CommentsApiPath } from '~/packages/comment/comment.js';
import { UserPayloadKey } from '~/packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import {
  getCrudHandlers,
  KNEX_SELECT_ONE_RECORD
} from '../../libs/packages/database/database.js';
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

const commentIdEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS,
  CommentsApiPath.$ID
]);

describe(`${commentApiPath} routes`, () => {
  const { getApp, getKnex } = buildApp();
  const { select, insert } = getCrudHandlers(getKnex);

  const app = getApp();

  let tokenMainUser: string;
  let tokenMinorUser: string;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });
    await setupTestComments({ handlers: { select, insert } });

    const [validTestMainUser, validTestMinorUser] = TEST_USERS_CREDENTIALS as [
      UserRegisterRequestDto,
      UserRegisterRequestDto
    ];

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

    tokenMainUser = loginMainUserResponse.json<UserLoginResponseDto>().token;
    tokenMinorUser = loginMinorUserResponse.json<UserLoginResponseDto>().token;
  });

  describe(`${commentIdEndpoint} (${HttpMethod.DELETE}) endpoint`, () => {
    it(`should return ${HttpCode.FORBIDDEN} with attempt to delete comment by not own user`, async () => {
      const commentToDelete = (await select<Comment>({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Comment;

      const deleteCommentResponse = await app
        .inject()
        .delete(commentIdEndpoint.replace(':id', commentToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        });

      const getCommentResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        });

      expect(deleteCommentResponse.statusCode).toBe(HttpCode.FORBIDDEN);
      expect(getCommentResponse.json()).toEqual(
        expect.objectContaining(commentToDelete)
      );
    });

    it(`should return ${HttpCode.OK} with deleted comment`, async () => {
      const commentToDelete = (await select<Comment>({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Comment;

      const deleteCommentResponse = await app
        .inject()
        .delete(commentIdEndpoint.replace(':id', commentToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        });

      const getCommentResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        });

      expect(deleteCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(getCommentResponse.statusCode).toEqual(HttpCode.NOT_FOUND);
    });
  });
});
