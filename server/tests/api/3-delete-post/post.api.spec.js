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
} from '../../../src/common/enums/enums.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${ENV.APP.API_PATH}${ApiPath.POSTS} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let post;

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

    const createPostResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body(testPost);

    tokenMainUser = registerMainUserResponse.json().token;
    tokenMinorUser = registerMinorUserResponse.json().token;
    post = createPostResponse.json();
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID} (${HttpMethod.DELETE}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with soft deleted post`,
        async () => {
          const deletePostResponse = await app.inject()
            .delete(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID.replace(':id', post.id)}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` });

          const getPostResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID.replace(':id', post.id)}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` });

          expect(deletePostResponse.statusCode).toBe(HttpCode.OK);
          expect(getPostResponse.json()).toEqual(expect.objectContaining({
            id: post.id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            [PostPayloadKey.BODY]: post[PostPayloadKey.BODY]
          }));
          expect(getPostResponse.json()).toHaveProperty('deletedAt');
        }
      );

      it(
        `should return ${HttpCode.FORBIDDEN} with attempt to delete post by not own user`,
        async () => {
          const deletePostResponse = await app.inject()
            .delete(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID.replace(':id', post.id)}`
            )
            .headers({ authorization: `Bearer ${tokenMinorUser}` });

          const getPostResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID.replace(':id', post.id)}`
            )
            .headers({ authorization: `Bearer ${tokenMinorUser}` });

          expect(deletePostResponse.statusCode).toBe(HttpCode.FORBIDDEN);
          expect(getPostResponse.json()).not.toHaveProperty('deletedAt');
        }
      );
    }
  );
});

