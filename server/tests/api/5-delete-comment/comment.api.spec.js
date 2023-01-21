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
  let tokenMainUser;
  let tokenMinorUser;
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

    const testPost = {
      [PostPayloadKey.BODY]: faker.lorem.paragraph()
    };

    const testComment = {
      [CommentPayloadKey.BODY]: faker.lorem.paragraph()
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

    const { id: postId } = createPostResponse.json();
    const createCommentResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body({ ...testComment, postId });

    comment = createCommentResponse.json();
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID} (${HttpMethod.DELETE}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with deleted comment`,
        async () => {
          const deleteCommentResponse = await app.inject()
            .delete(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                comment.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` });

          const getCommentResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                comment.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMainUser}` });

          expect(deleteCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(getCommentResponse.statusCode).toEqual(HttpCode.NOT_FOUND);
        }
      );

      it(
        `should return ${HttpCode.FORBIDDEN} with attempt to delete comment by not own user`,
        async () => {
          const deleteCommentResponse = await app.inject()
            .delete(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                comment.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMinorUser}` });

          const getCommentResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                comment.id
              )}`
            )
            .headers({ authorization: `Bearer ${tokenMinorUser}` });

          expect(deleteCommentResponse.statusCode).toBe(HttpCode.FORBIDDEN);
          expect(getCommentResponse.json()).toEqual(expect.objectContaining(comment));
        }
      );
    }
  );
});

