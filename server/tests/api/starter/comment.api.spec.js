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
import { joinPath, normalizeTrailingSlash } from '../../../src/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(joinPath(
  ENV.APP.API_PATH,
  ApiPath.COMMENTS
))} routes`, () => {
  const app = buildApp();
  let token;
  let userId;
  let postId;

  const registerEndpoint = normalizeTrailingSlash(joinPath(
    ENV.APP.API_PATH,
    ApiPath.AUTH,
    AuthApiPath.REGISTER
  ));

  const postsEndpoint = normalizeTrailingSlash(joinPath(
    ENV.APP.API_PATH,
    ApiPath.POSTS,
    PostsApiPath.ROOT
  ));

  beforeAll(async () => {
    const testUser = {
      [UserPayloadKey.USERNAME]: faker.name.firstName(),
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };

    const registerResponse = await app.inject()
      .post(registerEndpoint)
      .body(testUser);

    const testPost = {
      [PostPayloadKey.BODY]: faker.lorem.paragraph()
    };

    token = registerResponse.json().token;

    const createPostResponse = await app.inject()
      .post(postsEndpoint)
      .headers({ authorization: `Bearer ${token}` })
      .body(testPost);

    userId = registerResponse.json().user.id;
    postId = createPostResponse.json().id;
  });

  const commentsEndpoint = normalizeTrailingSlash(joinPath(
    ENV.APP.API_PATH,
    ApiPath.COMMENTS,
    CommentsApiPath.ROOT
  ));

  const commentEndpoint = normalizeTrailingSlash(joinPath(
    ENV.APP.API_PATH,
    ApiPath.COMMENTS,
    CommentsApiPath.$ID
  ));

  describe(
    `${commentsEndpoint} (${HttpMethod.POST}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.CREATED} with a new comment`,
        async () => {
          const testComment = {
            [CommentPayloadKey.BODY]: faker.lorem.paragraph(),
            postId
          };

          const response = await app.inject()
            .post(commentsEndpoint)
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
    `${commentEndpoint} (${HttpMethod.GET}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with comment by id`,
        async () => {
          const testComment = {
            [CommentPayloadKey.BODY]: faker.lorem.paragraph(),
            postId
          };
          const createCommentResponse = await app.inject()
            .post(commentsEndpoint)
            .headers({ authorization: `Bearer ${token}` })
            .body(testComment);

          const { id: commentId } = createCommentResponse.json();
          const response = await app.inject()
            .get(commentEndpoint.replace(':id', commentId))
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
