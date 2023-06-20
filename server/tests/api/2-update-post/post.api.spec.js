import { faker } from '@faker-js/faker';
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

const postApiPath = getJoinedNormalizedPath([
  config.ENV.APP.API_PATH,
  ApiPath.POSTS
]);

const postIdEndpoint = getJoinedNormalizedPath(
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.$ID
);

describe(`${postApiPath} routes`, () => {
  const { app, knex } = buildApp();
  const { select, insert } = getCrudHandlers(knex);

  let tokenMainUser;
  let tokenMinorUser;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });

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

  describe(`${postIdEndpoint} (${HttpMethod.PUT}) endpoint`, async () => {
    const post = await select({
      table: DatabaseTableName.POSTS,
      limit: KNEX_SELECT_ONE_RECORD
    });

    it(`should return ${HttpCode.FORBIDDEN} with attempt to update post by not own user`, async () => {
      const testUpdatedPost = {
        ...post,
        [PostPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const updatePostResponse = await app
        .inject()
        .put(postIdEndpoint.replace(':id', post.id))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        })
        .body(testUpdatedPost);

      const getPostResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', post.id))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMinorUser)
        });

      expect(updatePostResponse.statusCode).toBe(HttpCode.FORBIDDEN);
      expect(getPostResponse.json()).toEqual(post);
    });

    it(`should return ${HttpCode.OK} with updated post`, async () => {
      const testUpdatedPost = {
        ...post,
        [PostPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const updatePostResponse = await app
        .inject()
        .put(postIdEndpoint.replace(':id', post.id))
        .headers({
          [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(tokenMainUser)
        })
        .body(testUpdatedPost);

      expect(updatePostResponse.statusCode).toBe(HttpCode.OK);
      expect(updatePostResponse.json()).toEqual(
        expect.objectContaining({
          id: testUpdatedPost.id,
          createdAt: post.createdAt,
          [PostPayloadKey.BODY]: testUpdatedPost[PostPayloadKey.BODY]
        })
      );
    });
  });
});
