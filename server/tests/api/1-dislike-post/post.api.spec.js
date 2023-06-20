import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
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

const postReactEndpoint = getJoinedNormalizedPath(
  config.ENV.APP.API_PATH,
  ApiPath.POSTS,
  PostsApiPath.REACT
);

describe(`${postApiPath} routes`, () => {
  const { app, knex } = buildApp();
  const { select, insert } = getCrudHandlers(knex);

  let token;

  beforeAll(async () => {
    await setupTestUsers({ handlers: { insert } });
    await setupTestPosts({ handlers: { select, insert } });

    const [validTestUser] = TEST_USERS_CREDENTIALS;

    const loginResponse = await app
      .inject()
      .post(loginEndpoint)
      .body({
        [UserPayloadKey.EMAIL]: validTestUser[UserPayloadKey.EMAIL],
        [UserPayloadKey.PASSWORD]: validTestUser[UserPayloadKey.PASSWORD]
      });

    token = loginResponse.json().token;
  });

  describe(`${postReactEndpoint} (${HttpMethod.PUT}) endpoint`, async () => {
    const { id: postId } = await select({
      table: DatabaseTableName.COMMENTS,
      limit: KNEX_SELECT_ONE_RECORD
    });

    it(`should return ${HttpCode.OK} with liked post`, async () => {
      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
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
            Number(getPostBeforeLikeResponse.json().likeCount) + 1
          ),
          dislikeCount: getPostBeforeLikeResponse.json().dislikeCount
        })
      );
    });

    it(`should return ${HttpCode.OK} with removed user's like post`, async () => {
      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
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
            Number(getPostBeforeLikeResponse.json().likeCount) - 1
          ),
          dislikeCount: getPostBeforeLikeResponse.json().dislikeCount
        })
      );
    });

    it(`should return ${HttpCode.OK} with disliked post`, async () => {
      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: false });

      expect(dislikePostResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: getPostBeforeLikeResponse.json().likeCount,
          dislikeCount: String(
            Number(getPostBeforeLikeResponse.json().dislikeCount) + 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with removed user's dislike post`, async () => {
      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ [HttpHeader.AUTHORIZATION]: getBearerAuthHeader(token) })
        .body({ postId, isLike: false });

      expect(dislikePostResponse.statusCode).toBe(HttpCode.OK);
      expect(dislikePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: getPostBeforeLikeResponse.json().likeCount,
          dislikeCount: String(
            Number(getPostBeforeLikeResponse.json().dislikeCount) - 1
          )
        })
      );
    });

    it(`should return ${HttpCode.OK} with switched like to dislike post`, async () => {
      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
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
            Number(getPostBeforeLikeResponse.json().likeCount) + 1
          ),
          dislikeCount: getPostBeforeLikeResponse.json().dislikeCount
        })
      );
      expect(dislikePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(Number(likePostResponse.json().likeCount) - 1),
          dislikeCount: String(Number(likePostResponse.json().dislikeCount) + 1)
        })
      );
    });

    it(`should return ${HttpCode.OK} with switched dislike to like post`, async () => {
      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postIdEndpoint.replace(':id', postId))
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
          likeCount: getPostBeforeLikeResponse.json().likeCount,
          dislikeCount: String(
            Number(getPostBeforeLikeResponse.json().dislikeCount) + 1
          )
        })
      );
      expect(likePostResponse.json()).toEqual(
        expect.objectContaining({
          likeCount: String(Number(dislikePostResponse.json().likeCount) + 1),
          dislikeCount: String(
            Number(dislikePostResponse.json().dislikeCount) - 1
          )
        })
      );
    });
  });
});
