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
  let userMainId;
  let userMinorId;
  let posts;

  const registerEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.REGISTER)
  );

  const postsEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.ROOT)
  );

  const postEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.$ID)
  );

  const postReactEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.REACT)
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
    userMainId = registerMainUserResponse.json().user.id;
    userMinorId = registerMinorUserResponse.json().user.id;

    const testPosts = Array.from({ length: 2 }, (_, index) => ({
      [PostPayloadKey.BODY]: faker.lorem.paragraph(),
      token: !index ? tokenMainUser : tokenMinorUser
    }));

    const postsResponse = await Promise.all(
      testPosts.map(config => {
        return app
          .inject()
          .post(postsEndpoint)
          .headers({ authorization: `Bearer ${config.token}` })
          .body({
            [PostPayloadKey.BODY]: config[PostPayloadKey.BODY]
          });
      })
    );
    posts = postsResponse.map(response => response.json());

    await app
      .inject()
      .put(postReactEndpoint)
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body({ postId: posts[1].id });

    await app
      .inject()
      .put(postReactEndpoint)
      .headers({ authorization: `Bearer ${tokenMinorUser}` })
      .body({ postId: posts[0].id, isLike: false });
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with likes and dislikes of posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ authorization: `Bearer ${tokenMainUser}` });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          id: posts[0].id,
          userId: userMainId,
          likes: expect.arrayContaining([]),
          dislikes: expect.arrayContaining([
            expect.objectContaining({
              userId: userMinorId
            })
          ])
        }),
        expect.objectContaining({
          id: posts[1].id,
          userId: userMinorId,
          likes: expect.arrayContaining([
            expect.objectContaining({
              userId: userMainId
            })
          ]),
          dislikes: expect.arrayContaining([])
        })
      ]);
    });
  });

  describe(`${postEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with likes and dislikes of post`, async () => {
      const response = await app
        .inject()
        .get(postEndpoint.replace(':id', posts[1].id))
        .headers({ authorization: `Bearer ${tokenMainUser}` });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
          id: posts[1].id,
          userId: userMinorId,
          likes: expect.arrayContaining([
            expect.objectContaining({
              userId: userMainId
            })
          ]),
          dislikes: expect.arrayContaining([])
        })
      );
    });
  });
});
