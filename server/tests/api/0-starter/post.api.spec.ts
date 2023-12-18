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
import {
  type CreatePostRequestDto,
  type Post,
  type PostWithCommentImageUserNestedRelationsWithCount
} from '~/packages/post/post.js';
import { PostPayloadKey, PostsApiPath } from '~/packages/post/post.js';
import { UserPayloadKey } from '~/packages/user/user.js';

import { buildApp } from '../../libs/packages/app/app.js';
import {
  getCrudHandlers,
  KNEX_SELECT_ONE_RECORD
} from '../../libs/packages/database/database.js';
import { getBearerAuthHeader } from '../../libs/packages/http/http.js';
import { TEST_POSTS } from '../../packages/post/post.js';
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

  let token: string;
  let userId: number;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });

    const [validTestUser] = TEST_USERS_CREDENTIALS as [UserRegisterRequestDto];

    const loginResponse = await getApp()
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
      });

    token = loginResponse.json<UserLoginResponseDto>().token;
    userId = loginResponse.json<UserLoginResponseDto>().user.id;
  });

  describe(`${postsEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    const app = getApp();

    it(`should return ${HttpCode.CREATED} with a new post`, async () => {
      const [validTestPost] = TEST_POSTS as [
        Omit<CreatePostRequestDto, 'imageId'>
      ];

      const response = await app
        .inject()
        .post(postsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body(validTestPost);

      expect(response.statusCode).toBe(HttpCode.CREATED);
      expect(response.json()).toEqual(
        expect.objectContaining({
          userId,
          [PostPayloadKey.BODY]: validTestPost[PostPayloadKey.BODY]
        })
      );
      expect(response.json()).toHaveProperty('id');
      expect(response.json()).toHaveProperty('createdAt');
      expect(response.json()).toHaveProperty('updatedAt');

      const savedDatabasePost = await select<Post>({
        table: DatabaseTableName.POSTS,
        condition: { id: response.json<Post>().id },
        limit: KNEX_SELECT_ONE_RECORD
      });

      expect(savedDatabasePost).toEqual(
        expect.objectContaining({
          [PostPayloadKey.BODY]: validTestPost[PostPayloadKey.BODY]
        })
      );
    });
  });

  describe(`${postIdEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    const app = getApp();

    it(`should return ${HttpCode.OK} with post by id`, async () => {
      const result = await select<Post>({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });
      const { id: postId, body } = (result ?? {}) as Post;

      const response = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          id: postId,
          body
        })
      );
      expect(response.json()).toHaveProperty('likeCount');
      expect(response.json()).toHaveProperty('createdAt');
      expect(response.json()).toHaveProperty('updatedAt');
      expect(response.json()).toHaveProperty('dislikeCount');
      expect(response.json()).toHaveProperty('commentCount');
    });
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    const app = getApp();

    it(`should return ${HttpCode.OK} with all posts`, async () => {
      const posts =
        (await select<PostWithCommentImageUserNestedRelationsWithCount>({
          table: DatabaseTableName.POSTS,
          condition: { userId },
          offset: 0,
          limit: TEST_POSTS.length
        })) as PostWithCommentImageUserNestedRelationsWithCount[];

      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .query({
          from: '0',
          count: TEST_POSTS.length.toString(),
          userId: userId.toString()
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        posts.map(post => expect.objectContaining({ ...post }))
      );

      const [post] =
        response.json<PostWithCommentImageUserNestedRelationsWithCount[]>();

      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('likeCount');
      expect(post).toHaveProperty('createdAt');
      expect(post).toHaveProperty('updatedAt');
      expect(post).toHaveProperty('dislikeCount');
      expect(post).toHaveProperty('commentCount');
    });
  });

  describe(`${postReactEndpoint} (${HttpMethod.PUT}) endpoint`, () => {
    const app = getApp();

    it(`should return ${HttpCode.OK} with liked post`, async () => {
      const result = await select({
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
      const getPostAfterLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      expect(likePostResponse.statusCode).toBe(HttpCode.OK);
      expect(likePostResponse.json()).toEqual(
        expect.objectContaining({
          userId,
          postId,
          isLike: true
        })
      );
      expect(likePostResponse.json()).toHaveProperty('createdAt');
      expect(likePostResponse.json()).toHaveProperty('updatedAt');
      expect(getPostAfterLikeResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              getPostBeforeLikeResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) + 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with removed user's like post`, async () => {
      const result = await select({
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
      const getPostAfterLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId.toString()))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });

      expect(likePostResponse.statusCode).toBe(HttpCode.OK);
      expect(likePostResponse.json()).toEqual({});
      expect(getPostAfterLikeResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(
              getPostBeforeLikeResponse.json<Record<'likeCount', number>>()
                .likeCount
            ) - 1
          )
        })
      );
    });
  });
});
