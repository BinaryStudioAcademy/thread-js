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
} from '../../../src/libs/enums/enums.js';
import {
  joinPath,
  normalizeTrailingSlash
} from '../../../src/libs/helpers/helpers.js';
import { buildApp } from '../../helpers/helpers.js';

describe(`${normalizeTrailingSlash(
  joinPath(ENV.APP.API_PATH, ApiPath.COMMENTS)
)} and ${ENV.APP.API_PATH}${ApiPath.POSTS} routes`, () => {
  const app = buildApp();
  let tokenMainUser;
  let tokenMinorUser;
  let userMainId;
  let userMinorId;
  let post;
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

  const postEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.POSTS, PostsApiPath.$ID)
  );

  const commentReactEndpoint = normalizeTrailingSlash(
    joinPath(ENV.APP.API_PATH, ApiPath.COMMENTS, CommentsApiPath.REACT)
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

    const testPost = {
      [PostPayloadKey.BODY]: faker.lorem.paragraph()
    };

    const createPostResponse = app
      .inject()
      .post(postsEndpoint)
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body({
        [PostPayloadKey.BODY]: testPost[PostPayloadKey.BODY]
      });

    post = createPostResponse.json();

    const testComment = {
      [PostPayloadKey.BODY]: faker.lorem.paragraph()
    };

    const commentResponse = await app
      .inject()
      .post(commentsEndpoint)
      .headers({ authorization: `Bearer ${tokenMainUser}` })
      .body({
        postId: post.id,
        [PostPayloadKey.BODY]: testComment[PostPayloadKey.BODY]
      });
    comment = commentResponse.json();

    await app
      .inject()
      .put(commentReactEndpoint)
      .headers({ authorization: `Bearer ${tokenMinorUser}` })
      .body({ commentId: comment.id, isLike: false });
  });

  describe(`${commentEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with likes and dislikes of comment`, async () => {
      const response = await app
        .inject()
        .get(commentEndpoint.replace(':id', comment.id))
        .headers({ authorization: `Bearer ${tokenMainUser}` });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
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
      );
    });
  });

  describe(`${postEndpoint} (${HttpMethod.GET}) endpoint`, () => {
    it(`should return ${HttpCode.OK} with likes and dislikes of post's comment`, async () => {
      const response = await app
        .inject()
        .get(postEndpoint.replace(':id', post.id))
        .headers({ authorization: `Bearer ${tokenMainUser}` });

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(response.json()).toEqual(
        expect.objectContaining({
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
        })
      );
    });
  });
});
