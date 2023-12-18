import { beforeAll, describe, expect, it } from '@jest/globals';

import { ApiPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { HttpCode, HttpHeader, HttpMethod } from '~/libs/packages/http/http.js';
import { joinPath } from '~/libs/packages/path/path.js';
import { AuthApiPath } from '~/packages/auth/auth.js';
import {
  type UserLoginResponseDto,
  type UserRegisterRequestDto
} from '~/packages/auth/libs/types/types.js';
import { type Comment } from '~/packages/comment/comment.js';
import { PostsApiPath } from '~/packages/post/post.js';
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
  PostsApiPath.$ID
]);

const commentReactEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.COMMENTS,
  PostsApiPath.REACT
]);

describe(`${commentApiPath} routes`, () => {
  const { getApp, getKnex } = buildApp();
  const { select, insert } = getCrudHandlers(getKnex);

  const app = getApp();

  let token: string;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });
    await setupTestComments({ handlers: { select, insert } });

    const [validTestUser] = TEST_USERS_CREDENTIALS as [UserRegisterRequestDto];

    const loginResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
      });

    token = loginResponse.json<UserLoginResponseDto>().token;
  });

  describe(`${commentReactEndpoint} (${HttpMethod.PUT}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with liked comment`, async () => {
      const result = await select<Comment>({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      });

      const { id: commentId } = (result as Comment) ?? {};

      const getCommentBeforeLikeResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const likeCommentResponse = await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId });

      expect(likeCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(likeCommentResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              getCommentBeforeLikeResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) + 1
          ),
          dislikeCount:
            getCommentBeforeLikeResponse.json<Record<'dislikeCount', number>>()
              .dislikeCount
        })
      );
    });

    it(`should return ${HttpCode.OK} with removed user's like comment`, async () => {
      const { id: commentId } = (await select<Comment>({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Comment;

      const getCommentBeforeLikeResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const likeCommentResponse = await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId });

      expect(likeCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(likeCommentResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              getCommentBeforeLikeResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) - 1
          ),
          dislikeCount:
            getCommentBeforeLikeResponse.json<Record<'dislikeCount', number>>()
              .dislikeCount
        })
      );
    });

    it(`should return ${HttpCode.OK} with disliked comment`, async () => {
      const { id: commentId } = (await select<Comment>({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Comment;

      const getCommentBeforeLikeResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const dislikeCommentResponse = await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId, isLike: false });

      expect(dislikeCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikeCommentResponse.json()).toEqual(
        expect.objectContaining({
          likeCount:
            getCommentBeforeLikeResponse.json<Record<'likeCount', number>>()
              .likeCount,
          dislikeCount: String(
            Number(
              getCommentBeforeLikeResponse.json<
                Record<'dislikeCount', number>
              >().dislikeCount
            ) + 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with removed user's dislike comment`, async () => {
      const { id: commentId } = (await select<Comment>({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Comment;

      const getCommentBeforeLikeResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const dislikeCommentResponse = await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId, isLike: false });

      expect(dislikeCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikeCommentResponse.json()).toEqual(
        expect.objectContaining({
          likeCount:
            getCommentBeforeLikeResponse.json<Record<'likeCount', number>>()
              .likeCount,
          dislikeCount: String(
            Number(
              getCommentBeforeLikeResponse.json<
                Record<'dislikeCount', number>
              >().dislikeCount
            ) - 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with switched like to dislike comment`, async () => {
      const { id: commentId } = (await select<Comment>({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Comment;

      const getCommentBeforeLikeResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const likeCommentResponse = await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId, isLike: true });
      const dislikeCommentResponse = await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId, isLike: false });
      await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId, isLike: false });

      expect(likeCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikeCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(likeCommentResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              getCommentBeforeLikeResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) + 1
          ),
          dislikeCount:
            getCommentBeforeLikeResponse.json<Record<'dislikeCount', number>>()
              .dislikeCount
        })
      );
      expect(dislikeCommentResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              likeCommentResponse.json<Record<'likeCount', number>>().likeCount
            ) - 1
          ),
          dislikeCount: String(
            Number(
              likeCommentResponse.json<Record<'dislikeCount', number>>()
                .dislikeCount
            ) + 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with switched dislike to like comment`, async () => {
      const { id: commentId } = (await select<Comment>({
        table: DatabaseTableName.COMMENTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Comment;

      const getCommentBeforeLikeResponse = await app
        .inject()
        .get(commentIdEndpoint.replace(':id', commentId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const dislikeCommentResponse = await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId, isLike: false });
      const likeCommentResponse = await app
        .inject()
        .put(commentReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ commentId, isLike: true });

      expect(likeCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikeCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikeCommentResponse.json()).toEqual(
        expect.objectContaining({
          likeCount:
            getCommentBeforeLikeResponse.json<Record<'likeCount', number>>()
              .likeCount,
          dislikeCount: String(
            Number(
              getCommentBeforeLikeResponse.json<
                Record<'dislikeCount', number>
              >().dislikeCount
            ) + 1
          )
        })
      );
      expect(likeCommentResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              dislikeCommentResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) + 1
          ),
          dislikeCount: String(
            Number(
              dislikeCommentResponse.json<Record<'dislikeCount', number>>()
                .dislikeCount
            ) - 1
          )
        })
      );
    });
  });
});
