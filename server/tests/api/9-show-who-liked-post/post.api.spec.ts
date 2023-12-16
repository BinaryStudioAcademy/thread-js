import { beforeAll, describe, expect, it } from '@jest/globals';

import { ApiPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { HttpCode, HttpHeader, HttpMethod } from '~/libs/packages/http/http.js';
import { joinPath } from '~/libs/packages/path/path.js';
import {
  AuthApiPath,
  type UserLoginResponseDto,
  type UserRegisterRequestDto
} from '~/packages/auth/auth.js';
import { type Post, PostsApiPath } from '~/packages/post/post.js';
import { UserPayloadKey } from '~/packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import { getCrudHandlers } from '../../libs/packages/database/database.js';
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

const postsEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.ROOT
]);

describe(`${postApiPath} routes`, () => {
  const { getApp, getKnex } = buildApp();
  const { select, insert } = getCrudHandlers(getKnex);

  const app = getApp();

  let token: string;
  let userId: number;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });

    const [validTestUser] = TEST_USERS_CREDENTIALS as [UserRegisterRequestDto];

    const loginUserResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
      });

    token = loginUserResponse.json<UserLoginResponseDto>().token;
    userId = loginUserResponse.json<UserLoginResponseDto>().user.id;

    const [{ id: firstPostId }, { id: secondPostId }] = (await select<Post>({
      table: DatabaseTableName.POSTS
    })) as [Post, Post];

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

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with likes and dislikes of posts`, async () => {
      const [{ id: firstPostId }, { id: secondPostId }] = (await select<Post>({
        table: DatabaseTableName.POSTS
      })) as [Post, Post];

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

  describe(`${postIdEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with likes and dislikes of post`, async () => {
      const [{ id: firstPostId }, { id: secondPostId }] = (await select<Post>({
        table: DatabaseTableName.POSTS
      })) as [Post, Post];

      const firstPostResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', firstPostId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      const secondPostResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', secondPostId.toString()))
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
