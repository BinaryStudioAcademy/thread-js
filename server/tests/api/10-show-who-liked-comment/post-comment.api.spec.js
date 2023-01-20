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
  CommentsApiPath
} from '../../../src/common/enums/enums.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${ENV.APP.API_PATH}${ApiPath.COMMENTS} and ${ENV.APP.API_PATH}${ApiPath.POSTS} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let userMainId;
  let userMinorId;
  let post;
  let comment;

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

    const testPost = {
      [PostPayloadKey.BODY]: faker.lorem.paragraph()
    };

    const createPostResponse = app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body({
        [PostPayloadKey.BODY]: testPost[PostPayloadKey.BODY]
      });

    post = createPostResponse.json();

    const testComment = {
      [PostPayloadKey.BODY]: faker.lorem.paragraph()
    };

    const commentResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body({
        postId: post.id,
        [PostPayloadKey.BODY]: testComment[PostPayloadKey.BODY]
      });
    comment = commentResponse.json();

    await app.inject()
      .put(
        `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
      )
      .headers({ authorization: `Bearer ${tokenMinorUser}` })
      .body({ commentId: comment.id, isLike: false });
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID} (${HttpMethod.GET}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with likes and dislikes of comment`,
        async () => {
          const response = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                comment.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` });

          expect(response.statusCode).toBe(HttpCode.OK);
          expect(response.json()).toEqual(expect.objectContaining({
            id: comment.id,
            userId: userMainId,
            likes: expect.arrayContaining([
              expect.objectContaining({
                userId: userMinorId
              })
            ]),
            dislikes: expect.arrayContaining([])
          }));
        }
      );
    }
  );

  describe(
    `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID} (${HttpMethod.GET}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with likes and dislikes of post's comment`,
        async () => {
          const response = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.$ID.replace(
                ':id',
                post.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` });

          expect(response.statusCode).toBe(HttpCode.OK);
          expect(response.json()).toEqual(expect.objectContaining({
            id: comment.id,
            userId: userMainId,
            comments: expect.arrayContaining([
              expect.objectContaining({
                id: comment.id,
                userId: userMainId,
                likes: expect.arrayContaining([
                  expect.objectContaining({
                    userId: userMinorId
                  })
                ]),
                dislikes: expect.arrayContaining([])
              })
            ])
          }));
        }
      );
    }
  );
});
