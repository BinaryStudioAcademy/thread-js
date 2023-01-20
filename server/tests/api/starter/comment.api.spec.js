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
  CommentsApiPath,
  CommentPayloadKey
} from '../../../src/common/enums/enums.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${ENV.APP.API_PATH}${ApiPath.COMMENTS} routes`, () => {
  const app = buildApp();
  let token;
  let userId;
  let postId;

  beforeAll(async () => {
    const testUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const registerResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
      )
      .body(testUser);

    const testPost = {
      [PostPayloadKey.BODY]: faker.lorem.paragraph()
    };

    const createPostResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${token}` })
      .body(testPost);

    token = registerResponse.json().token;
    userId = registerResponse.json().user.id;
    postId = createPostResponse.json().id;
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${PostsApiPath.ROOT} (${HttpMethod.POST}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with a new comment`,
        async () => {
          const testComment = {
            [CommentPayloadKey.BODY]: faker.lorem.paragraph(),
            postId
          };

          const response = await app.inject()
            .post(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body(testComment);

          expect(response.statusCode).toBe(HttpCode.CREATED);
          expect(response.json()).toEqual(expect.objectContaining({
            userId,
            ...testComment
          }));
          expect(response.json()).toHaveProperty('id');
          expect(response.json()).toHaveProperty('createdAt');
          expect(response.json()).toHaveProperty('updatedAt');
        }
      );
    }
  );

  describe(
    `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${PostsApiPath.$ID} (${HttpMethod.GET}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with comment by id`,
        async () => {
          const testComment = {
            [CommentPayloadKey.BODY]: faker.lorem.paragraph(),
            postId
          };
          const createCommentResponse = await app.inject()
            .post(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body(testComment);

          const { id: commentId } = createCommentResponse.json();
          const response = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(':id', commentId)}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body(testComment);

          expect(response.statusCode).toBe(HttpCode.OK);
          expect(response.json()).toEqual(expect.objectContaining({
            userId,
            id: commentId,
            postId,
            [PostPayloadKey.BODY]: testComment[PostPayloadKey.BODY],
            user: expect.objectContaining({ id: userId })
          }));
          expect(response.json()).toHaveProperty('id');
          expect(response.json()).toHaveProperty('createdAt');
          expect(response.json()).toHaveProperty('updatedAt');
        }
      );
    }
  );
});
