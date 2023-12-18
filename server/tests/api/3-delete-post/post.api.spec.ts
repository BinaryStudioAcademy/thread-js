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
import {
  type Post,
  PostPayloadKey,
  PostsApiPath
} from '~/packages/post/post.js';
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

const postsEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.ROOT
]);

describe(`${postApiPath} routes`, () => {
  const { getApp, getKnex } = buildApp();
  const { select, insert } = getCrudHandlers(getKnex);

  const app = getApp();

  let tokenMainUser: string;
  let tokenMinorUser: string;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });

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

  describe(`${postIdEndpoint} (${HttpMethod.DELETE}) endpoint`, () => {
    it(`should return ${HttpCode.FORBIDDEN} with attempt to delete post by not own user`, async () => {
      const postToDelete = (await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Post;

      const deletePostResponse = await app
        .inject()
        .delete(postIdEndpoint.replace(':id', postToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        });

      const getPostResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        });

      expect(deletePostResponse.statusCode).toBe(HttpCode.FORBIDDEN);
      expect(getPostResponse.json()).toMatchObject(postToDelete);
    });

    it(`should return ${HttpCode.OK} with soft deleted post`, async () => {
      const postToDelete = (await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Post;

      const deletePostResponse = await app
        .inject()
        .delete(postIdEndpoint.replace(':id', postToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        });

      const getPostResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        });

      expect(deletePostResponse.statusCode).toBe(HttpCode.OK);
      expect(getPostResponse.json()).toEqual(
        expect.objectContaining({
          id: postToDelete.id,
          createdAt: postToDelete.createdAt,
          [PostPayloadKey.BODY]: postToDelete[PostPayloadKey.BODY]
        })
      );
      expect(getPostResponse.json()).toHaveProperty('deletedAt');
    });
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with ignoring soft deleted post`, async () => {
      const postToDelete = (await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Post;

      await app
        .inject()
        .delete(postIdEndpoint.replace(':id', postToDelete.id.toString()))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        });

      const getPostsResponse = await app
        .inject()
        .get(postsEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        })
        .query({ from: '0', count: '1' });

      expect(getPostsResponse.statusCode).toBe(HttpCode.OK);
      expect(getPostsResponse.json()).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: postToDelete.id })
        ])
      );
    });
  });
});
