import { it, describe, expect, beforeAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { config } from '../../../src/libs/packages/config/config.js';
import {
  ApiPath,
  HttpCode,
  HttpMethod,
  AuthApiPath,
  PostsApiPath,
  UserPayloadKey,
  PostPayloadKey,
  FilterUserMode
} from '../../../src/libs/enums/enums.js';
import {
  joinPath,
  normalizeTrailingSlash
} from '../../../src/libs/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(config.ENV.APP.API_PATH, ApiPath.POSTS)
)} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let userMainId;
  let userMinorId;

  const registerEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.REGISTER)
  );

  const postsEndpoint = normalizeTrailingSlash(
    joinPath(config.ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.ROOT)
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

    await Promise.all(
      testPosts.map(testPost => {
        return app
          .inject()
          .post(postsEndpoint)
          .headers({ authorization: `Bearer ${testPost.token}` })
          .body({
            [PostPayloadKey.BODY]: testPost[PostPayloadKey.BODY]
          });
      })
    );
  });

  describe(`${postsEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with own posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ authorization: `Bearer ${tokenMainUser}` })
        .query({
          from: 0,
          count: 1,
          userId: userMainId,
          userMode: FilterUserMode.INCLUDE
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          userId: userMainId
        })
      ]);
    });

    it(`should return ${HttpCode.OK} with not own posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ authorization: `Bearer ${tokenMainUser}` })
        .query({
          from: 0,
          count: 1,
          userId: userMainId,
          userMode: FilterUserMode.EXCLUDE
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          userId: userMinorId
        })
      ]);
    });

    it(`should return ${HttpCode.OK} with all users' posts`, async () => {
      const response = await app
        .inject()
        .get(postsEndpoint)
        .headers({ authorization: `Bearer ${tokenMainUser}` })
        .query({
          from: 0,
          count: 2
        });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual([
        expect.objectContaining({
          userId: userMinorId
        }),
        expect.objectContaining({
          userId: userMainId
        })
      ]);
    });
  });
});
