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

    tokenMainUser = registerMainUserResponse.json().token;
    tokenMinorUser = registerMinorUserResponse.json().token;

    const createPostResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body(testPost);

    post = createPostResponse.json();
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID} (${HttpMethod.PUT}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with updated post`,
        async () => {
          const testUpdatedPost = {
            ...post,
            [PostPayloadKey.BODY]: faker.lorem.paragraph()
          };

          const updatePostResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID.replace(':id', post.id)}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` })
            .body(testUpdatedPost);

          expect(updatePostResponse.statusCode).toBe(HttpCode.OK);
          expect(updatePostResponse.json()).toEqual(expect.objectContaining({
            id: testUpdatedPost.id,
            createdAt: post.createdAt,
            [PostPayloadKey.BODY]: testUpdatedPost[PostPayloadKey.BODY]
          }));
        }
      );

      it(
        `should return ${HttpCode.FORBIDDEN} with attempt to update post by not own user`,
        async () => {
          const testUpdatedPost = {
            ...post,
            [PostPayloadKey.BODY]: faker.lorem.paragraph()
          };

          const updatePostResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID.replace(':id', post.id)}`
            )
            .headers({ authorization: `Bearer ${tokenMinorUser}` })
            .body(testUpdatedPost);

          const getPostResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID.replace(':id', post.id)}`
            )
            .headers({ authorization: `Bearer ${tokenMinorUser}` });

          expect(updatePostResponse.statusCode).toBe(HttpCode.FORBIDDEN);
          expect(getPostResponse.json()).toEqual(post);
        }
      );
    }
  );
});

