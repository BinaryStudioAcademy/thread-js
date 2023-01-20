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
  PostPayloadKey,
  FilterUserMode
} from '../../../src/common/enums/enums.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${ENV.APP.API_PATH}${ApiPath.POSTS} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let userMainId;
  let userMinorId;
  let posts;

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

    const registerMainUserResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
      )
      .body(testMainUser);

    const registerMinorUserResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
      )
      .body(testMinorUser);

    tokenMainUser = registerMainUserResponse.json().token;
    tokenMinorUser = registerMinorUserResponse.json().token;
    userMainId = registerMainUserResponse.json().user.id;
    userMinorId = registerMinorUserResponse.json().user.id;

    const testPosts = Array.from({ length: 2 }, (_, index) => ({
      [PostPayloadKey.BODY]: faker.lorem.paragraph(),
      token: !index ? tokenMainUser : tokenMinorUser
    }));

    const postsResponse = await Promise.all(testPosts.map(config => app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${config.token}` })
      .body({
        [PostPayloadKey.BODY]: config[PostPayloadKey.BODY]
      })));
    posts = postsResponse.map(response => response.json());
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT} (${HttpMethod.GET}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with liked by own posts`,
        async () => {
          await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` })
            .body({ postId: posts[1].id });

          const response = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` })
            .query({
              from: 0,
              count: 1,
              userId: userMainId,
              userMode: FilterUserMode.LIKED_BY_OWN
            });

          expect(response.statusCode).toBe(HttpCode.OK);
          expect(response.json()).toEqual([
            expect.objectContaining({
              postId: posts[1].id
            })
          ]);
        }
      );

      it(
        `should return ${HttpCode.OK} with all users' posts`,
        async () => {
          const response = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT}`
            )
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
        }
      );
    }
  );
});
