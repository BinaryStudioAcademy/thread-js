import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, it } from '@jest/globals';

import {
  ApiPath,
  AuthApiPath,
  HttpCode,
  HttpMethod,
  PostPayloadKey,
  PostsApiPath,
  UserPayloadKey
} from '#libs/enums/enums.js';
import { joinPath, normalizeTrailingSlash } from '#libs/helpers/helpers.js';
import { config } from '#libs/packages/config/config.js';

import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(config.ENV.APP.API_PATH, ApiPath.POSTS)
)} routes`, () => {
  const app = buildApp();
  let token;

  const registerEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.REGISTER)
  );

  beforeAll(async () => {
    const testUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const registerResponse = await app
      .inject()
      .post(registerEndpoint)
      .body(testUser);

    token = registerResponse.json().token;
  });

  const postsEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.ROOT)
  );

  const postEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.$ID)
  );

  const postReactEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.REACT)
  );

  describe(`${postReactEndpoint} (${HttpMethod.PUT}) endpoint`, () => {
    let postId;

    beforeAll(async () => {
      const testPost = {
        [PostPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const createResponse = await app
        .inject()
        .post(postsEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .body(testPost);
      postId = createResponse.json().id;
    });

    it(`should return ${HttpCode.OK} with liked post`, async () => {
      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
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
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });
      const likePostResponse = await app
        .inject()
        .put(`${config.ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.REACT}`)
        .headers({ authorization: `Bearer ${token}` })
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
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
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
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
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
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .body({ postId, isLike: true });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .body({ postId, isLike: false });
      await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
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
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });
      const dislikePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .body({ postId, isLike: false });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
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
