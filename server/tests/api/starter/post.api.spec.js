import { it, describe, expect, beforeAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { config } from '#libs/packages/config/config.js';
import {
  ApiPath,
  HttpCode,
  HttpMethod,
  AuthApiPath,
  PostsApiPath,
  UserPayloadKey,
  PostPayloadKey
} from '#libs/enums/enums.js';
import { joinPath, normalizeTrailingSlash } from '#libs/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(config.ENV.APP.API_PATH, ApiPath.POSTS)
)} routes`, () => {
  const app = buildApp();
  let token;
  let userId;

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
    userId = registerResponse.json().user.id;
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

  describe(`${postsEndpoint} (${HttpMethod.POST}) endpoint`, () => {
    it(`should return ${HttpCode.CREATED} with a new post`, async () => {
      const testPost = {
        [PostPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const response = await app
        .inject()
        .post(postsEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .body(testPost);

      expect(response.statusCode).toBe(HttpCode.CREATED);
      expect(response.json()).toEqual(
        expect.objectContaining({
          userId,
          [PostPayloadKey.BODY]: testPost[PostPayloadKey.BODY]
        })
      );
      expect(response.json()).toHaveProperty('id');
      expect(response.json()).toHaveProperty('createdAt');
      expect(response.json()).toHaveProperty('updatedAt');
    });
  });

  describe(`${postEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with post by id`, async () => {
      const testPost = {
        [PostPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const createResponse = await app
        .inject()
        .post(postsEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .body(testPost);

      const { id: postId } = createResponse.json();
      const response = await app
        .inject()
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          userId,
          id: postId,
          [PostPayloadKey.BODY]: testPost[PostPayloadKey.BODY],
          user: expect.objectContaining({ id: userId })
        })
      );
      expect(response.json()).toHaveProperty('id');
      expect(response.json()).toHaveProperty('likeCount');
      expect(response.json()).toHaveProperty('createdAt');
      expect(response.json()).toHaveProperty('updatedAt');
      expect(response.json()).toHaveProperty('dislikeCount');
      expect(response.json()).toHaveProperty('commentCount');
    });
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with all posts`, async () => {
      const testPosts = Array.from({ length: 2 }, () => ({
        [PostPayloadKey.BODY]: faker.lorem.paragraph()
      }));

      const createResponse = await Promise.all(
        testPosts.map(testPost => {
          return app
            .inject()
            .post(postsEndpoint)
            .headers({ authorization: `Bearer ${token}` })
            .body(testPost);
        })
      );

      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .query({ from: 0, count: testPosts.length, userId });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            userId,
            id: createResponse[1].json().id,
            [PostPayloadKey.BODY]:
              createResponse[1].json()[PostPayloadKey.BODY],
            user: expect.objectContaining({ id: userId })
          }),
          expect.objectContaining({
            userId,
            id: createResponse[0].json().id,
            [PostPayloadKey.BODY]:
              createResponse[0].json()[PostPayloadKey.BODY],
            user: expect.objectContaining({ id: userId })
          })
        ])
      );

      expect(response.json()[0]).toHaveProperty('id');
      expect(response.json()[0]).toHaveProperty('likeCount');
      expect(response.json()[0]).toHaveProperty('createdAt');
      expect(response.json()[0]).toHaveProperty('updatedAt');
      expect(response.json()[0]).toHaveProperty('dislikeCount');
      expect(response.json()[0]).toHaveProperty('commentCount');
    });
  });

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
      const getPostAfterLikeResponse = await app
        .inject()
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });

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
      const getPostBeforeLikeResponse = await app
        .inject()
        .get(postEndpoint.replace(':id', postId))
        .headers({ authorization: `Bearer ${token}` });
      const likePostResponse = await app
        .inject()
        .put(postReactEndpoint)
        .headers({ authorization: `Bearer ${token}` })
        .body({ postId });
      const getPostAfterLikeResponse = await app
        .inject()
        .get(postEndpoint.replace(':id', postId))
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
