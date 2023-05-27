import { it, describe, expect, beforeAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import {
  ENV,
  ApiPath,
  HttpCode,
  HttpMethod,
  AuthApiPath,
  PostsApiPath,
  UserPayloadKey,
  PostPayloadKey
} from '../../../src/libs/enums/enums.js';
import {
  joinPath,
  normalizeTrailingSlash
} from '../../../src/libs/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(ENV.APP.API_PATH, ApiPath.POSTS)
)} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let post;

  const registerEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.REGISTER)
  );

  const postsEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.ROOT)
  );

  const postEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.$ID)
  );

  beforeAll(async () => {
    const testMainUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const testMinorUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const testPost = {
      [PostPayloadKey.BODY]: faker.lorem.paragraph()
    };

    const registerMainUserResponse = await app
      .inject()
      .post(registerEndpoint)
      .body(testMainUser);

    const registerMinorUserResponse = await app
      .inject()
      .post(registerEndpoint)
      .body(testMinorUser);

    tokenMainUser = registerMainUserResponse.json().token;
    tokenMinorUser = registerMinorUserResponse.json().token;

    const createPostResponse = await app
      .inject()
      .post(postsEndpoint)
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body(testPost);

    post = createPostResponse.json();
  });

  describe(`${postEndpoint} (${HttpMethod.DELETE}) endpoint`, () => {
    it(`should return ${HttpCode.FORBIDDEN} with attempt to delete post by not own user`, async () => {
      const deletePostResponse = await app
        .inject()
        .delete(postEndpoint.replace(':id', post.id))
        .headers({ authorization: `Bearer ${tokenMinorUser}` });

      const getPostResponse = await app
        .inject()
        .get(postEndpoint.replace(':id', post.id))
        .headers({ authorization: `Bearer ${tokenMinorUser}` });

      expect(deletePostResponse.statusCode).toBe(HttpCode.FORBIDDEN);
      expect(getPostResponse.json()).not.toHaveProperty('deletedAt');
    });

    it(`should return ${HttpCode.OK} with soft deleted post`, async () => {
      const deletePostResponse = await app
        .inject()
        .delete(postEndpoint.replace(':id', post.id))
        .headers({ authorization: `Bearer ${tokenMainUser}` });

      const getPostResponse = await app
        .inject()
        .get(postEndpoint.replace(':id', post.id))
        .headers({ authorization: `Bearer ${tokenMainUser}` });

      expect(deletePostResponse.statusCode).toBe(HttpCode.OK);
      expect(getPostResponse.json()).toEqual(
        expect.objectContaining({
          id: post.id,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          [PostPayloadKey.BODY]: post[PostPayloadKey.BODY]
        })
      );
      expect(getPostResponse.json()).toHaveProperty('deletedAt');
    });
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with ignoring soft deleted post`, async () => {
      const getPostsResponse = await app
        .inject()
        .get(postsEndpoint)
        .headers({ authorization: `Bearer ${tokenMinorUser}` })
        .query({ from: 0, count: 1 });

      expect(getPostsResponse.statusCode).toBe(HttpCode.OK);
      expect(getPostsResponse.json()).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: post.id })])
      );
    });
  });
});
