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
  FilterUserMode,
  type Post,
  PostsApiPath
} from '~/packages/post/post.js';
import { UserPayloadKey } from '~/packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import {
  getCrudHandlers,
  KNEX_SELECT_ONE_RECORD
} from '../../libs/packages/database/database.js';
import { getBearerAuthHeader } from '../../libs/packages/http/http.js';
import { setupTestPosts, TEST_POSTS } from '../../packages/post/post.js';
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

const postsEndpoint = joinPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.ROOT
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
  let userId: number;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });

    const [validUser] = TEST_USERS_CREDENTIALS as [UserRegisterRequestDto];

    const loginResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validUser[UserPayloadKey.PASSWORD]
      });

    token = loginResponse.json<UserLoginResponseDto>().token;
    userId = loginResponse.json<UserLoginResponseDto>().user.id;
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with liked by own posts`, async () => {
      const { id: postId } = (await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      })) as Post;

      await app
        .inject()
        .put(postReactEndpoint)
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token)
        })
        .body({ postId });

      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .query({
          from: '0',
          count: '1',
          userId: userId.toString(),
          userMode: FilterUserMode.LIKED_BY_OWN
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: postId })])
      );
    });

    it(`should return ${HttpCode.OK} with all users' posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .query({
          from: '0',
          count: TEST_POSTS.length.toString()
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            userId: expect.not.stringContaining(userId.toString())
          }),
          expect.objectContaining({ userId })
        ])
      );
    });
  });
});
