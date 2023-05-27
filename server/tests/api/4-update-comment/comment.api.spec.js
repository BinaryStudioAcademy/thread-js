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
} from '../../../src/libs/enums/enums.js';
import {
  joinPath,
  normalizeTrailingSlash
} from '../../../src/libs/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(ENV.APP.API_PATH, ApiPath.COMMENTS)
)} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let comment;

  const registerEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.AUTH, AuthApiPath.REGISTER)
  );

  const postsEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.ROOT)
  );

  const commentsEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.COMMENTS, CommentsApiPath.ROOT)
  );

  const commentEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.COMMENTS, CommentsApiPath.$ID)
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

    const testComment = {
      [CommentPayloadKey.BODY]: faker.lorem.paragraph()
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

    const { id: postId } = createPostResponse.json();
    const createCommentResponse = await app
      .inject()
      .post(commentsEndpoint)
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body({ ...testComment, postId });

    comment = createCommentResponse.json();
  });

  describe(`${commentEndpoint} (${HttpMethod.PUT}) endpoint`, () => {
    it(`should return ${HttpCode.FORBIDDEN} with attempt to update comment by not own user`, async () => {
      const testUpdatedComment = {
        ...comment,
        [CommentPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const updateCommentResponse = await app
        .inject()
        .put(commentEndpoint.replace(':id', comment.id))
        .headers({ authorization: `Bearer ${tokenMinorUser}` })
        .body(testUpdatedComment);

      const getCommentResponse = await app
        .inject()
        .get(commentEndpoint.replace(':id', comment.id))
        .headers({ authorization: `Bearer ${tokenMinorUser}` });

      expect(updateCommentResponse.statusCode).toBe(HttpCode.FORBIDDEN);
      expect(getCommentResponse.json()).toEqual(comment);
    });

    it(`should return ${HttpCode.OK} with updated comment`, async () => {
      const testUpdatedComment = {
        ...comment,
        [CommentPayloadKey.BODY]: faker.lorem.paragraph()
      };

      const updateCommentResponse = await app
        .inject()
        .put(commentEndpoint.replace(':id', comment.id))
        .headers({ authorization: `Bearer ${tokenMainUser}` })
        .body(testUpdatedComment);

      expect(updateCommentResponse.statusCode).toBe(HttpCode.OK);
      expect(updateCommentResponse.json()).toEqual(
        expect.objectContaining({
          id: testUpdatedComment.id,
          createdAt: testUpdatedComment.createdAt,
          [CommentPayloadKey.BODY]: testUpdatedComment[PostPayloadKey.BODY]
        })
      );
    });
  });
});
