import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
  PostPayloadKey,
  PostsApiPath,
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
import { TEST_POSTS } from '../../helpers/setup-test-data/setup-test-posts/setup-test-posts.helper.js';
import { TEST_USERS_CREDENTIALS } from '../../helpers/setup-test-data/setup-test-users/setup-test-users.helper.js';
import { KNEX_SELECT_ONE_RECORD } from '../../libs/constants/constants.js';

const loginEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.AUTH,
  AuthApiPath.LOGIN
]);

const postApiPath = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS
]);

const postsEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.ROOT
]);

const postIdEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.$ID
]);

const postReactEndpoint = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.REACT
]);

describe(`${postApiPath} routes`, () => {
  const { app, knex } = buildApp();
  const { select, insert } = getCrudHandlers(knex);

  let token;
  let userId;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });

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

  describe(`${postsEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    it(`should return ${HttpCode.CREATED} with a new post`, async () => {
      const [validTestPost] = TEST_POSTS;

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
    });
  });

  describe(`${postIdEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with post by id`, async () => {
      const { id: postId, body } = await select({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });

      const response = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
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
    it(`should return ${HttpCode.OK} with all posts`, async () => {
      const posts = await select({
        table: DatabaseTableName.POSTS,
        condition: { userId },
        offset: 0,
        limit: TEST_POSTS.length
      });

      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .query({ from: 0, count: TEST_POSTS.length, userId });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        posts.map(post => expect.objectContaining(post))
      );

      const [post] = response.json();

      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('likeCount');
      expect(post).toHaveProperty('createdAt');
      expect(post).toHaveProperty('updatedAt');
      expect(post).toHaveProperty('dislikeCount');
      expect(post).toHaveProperty('commentCount');
    });
  });

  describe(`${postReactEndpoint} (${HttpMethod.PUT}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with liked post`, async () => {
      const { id: postId } = await select({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });

      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId });
      const getPostAfterLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
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
            Number(getPostBeforeLikeResponse.json().likeCount) + 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with removed user's like post`, async () => {
      const { id: postId } = await select({
        table: DatabaseTableName.POSTS,
        limit: KNEX_SELECT_ONE_RECORD
      });

      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .body({ postId });
      const getPostAfterLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });

      expect(likePostResponse.statusCode).toBe(HttpCode.OK);
      expect(likePostResponse.json()).toEqual({});
      expect(getPostAfterLikeResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(
            Number(getPostBeforeLikeResponse.json().likeCount) - 1
          )
        })
      );
    });
  });
});
