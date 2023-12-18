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
import { type Post, PostsApiPath } from '~/packages/post/post.js';
import { UserPayloadKey } from '~/packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import {
  getCrudHandlers,
  KNEX_SELECT_ONE_RECORD
} from '../../libs/packages/database/database.js';
import { getBearerAuthHeader } from '../../libs/packages/http/http.js';
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

const postApiPath = joinPath([config.ENV.APP.API_PATH, ApiPath.POSTS]);

const postIdEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.$ID
]);

const postReactEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.REACT
]);

describe(`${postApiPath} routes`, () => {
  const { getApp, getKnex } = buildApp();
  const { select, insert } = getCrudHandlers(getKnex);

  const app = getApp();

  let token: string;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });

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

  describe(`${postReactEndpoint} (${HttpMethod.PUT}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with liked post`, async () => {
      const result = await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });
      const { id: postId } = (result ?? {}) as Post;

      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId });

      expect(likePostResponse.statusCode).toBe(HttpCode.OK);
      expect(likePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              getPostBeforeLikeResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) + 1
          ),
          dislikeCount:
            getPostBeforeLikeResponse.json<Record<'dislikeCount', number>>()
              .dislikeCount
        })
      );
    });

    it(`should return ${HttpCode.OK} with removed user's like post`, async () => {
      const result = await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });
      const { id: postId } = (result ?? {}) as Post;

      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const likePostResponse = await app
        .inject()
        .put(`${config.ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.REACT}`)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId });

      expect(likePostResponse.statusCode).toBe(HttpCode.OK);
      expect(likePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              getPostBeforeLikeResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) - 1
          ),
          dislikeCount:
            getPostBeforeLikeResponse.json<Record<'dislikeCount', number>>()
              .dislikeCount
        })
      );
    });

    it(`should return ${HttpCode.OK} with disliked post`, async () => {
      const result = await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });
      const { id: postId } = (result ?? {}) as Post;

      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: false });

      expect(dislikePostResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount:
            getPostBeforeLikeResponse.json<Record<'likeCount', number>>()
              .likeCount,
          dislikeCount: String(
            Number(
              getPostBeforeLikeResponse.json<Record<'dislikeCount', number>>()
                .dislikeCount
            ) + 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with removed user's dislike post`, async () => {
      const result = await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });
      const { id: postId } = (result ?? {}) as Post;

      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: false });

      expect(dislikePostResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount:
            getPostBeforeLikeResponse.json<Record<'likeCount', number>>()
              .likeCount,
          dislikeCount: String(
            Number(
              getPostBeforeLikeResponse.json<Record<'dislikeCount', number>>()
                .dislikeCount
            ) - 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with switched like to dislike post`, async () => {
      const result = await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });
      const { id: postId } = (result ?? {}) as Post;

      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: true });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: false });
      await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: false });

      expect(likePostResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikePostResponse.statusCode).toBe(HttpCode.OK);
      expect(likePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              getPostBeforeLikeResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) + 1
          ),
          dislikeCount:
            getPostBeforeLikeResponse.json<Record<'dislikeCount', number>>()
              .dislikeCount
        })
      );
      expect(dislikePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              likePostResponse.json<Record<'likeCount', number>>().likeCount
            ) - 1
          ),
          dislikeCount: String(
            Number(
              likePostResponse.json<Record<'dislikeCount', number>>()
                .dislikeCount
            ) + 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with switched dislike to like post`, async () => {
      const result = await select({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });
      const { id: postId } = (result ?? {}) as Post;

      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: false });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: true });

      expect(likePostResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikePostResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount:
            getPostBeforeLikeResponse.json<Record<'likeCount', number>>()
              .likeCount,
          dislikeCount: String(
            Number(
              getPostBeforeLikeResponse.json<Record<'dislikeCount', number>>()
                .dislikeCount
            ) + 1
          )
        })
      );
      expect(likePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              dislikePostResponse.json<Record<'likeCount', number>>().likeCount
            ) + 1
          ),
          dislikeCount: String(
            Number(
              dislikePostResponse.json<Record<'dislikeCount', number>>()
                .dislikeCount
            ) - 1
          )
        })
      );
    });
  });
});
