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
  let commentId;

  beforeAll(async () => {
    const testUser = {
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

    const registerResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.AUTH}${AuthApiPath.REGISTER}`
      )
      .body(testUser);

    const createPostResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.POSTS}${PostsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${token}` })
      .body(testPost);

    const { id: postId } = createPostResponse.json();

    const createCommentResponse = await app.inject()
      .post(
        `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}`
      )
      .headers({ authorization: `Bearer ${token}` })
      .body({ ...testComment, postId });

    token = registerResponse.json().token;
    commentId = createCommentResponse.json().id;
  });

  describe(
    `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT} (${HttpMethod.PUT}) endpoint`,
    () => {
      it(
        `should return ${HttpCode.OK} with liked comment`,
        async () => {
          const getCommentBeforeLikeResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                commentId
              )}`
            )
            .headers({ authorization: `Bearer ${token}` });
          const likeCommentResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId });

          expect(likeCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(likeCommentResponse.json()).toEqual(expect.objectContaining({
            likeCount: String(Number(getCommentBeforeLikeResponse.json().likeCount) + 1),
            dislikeCount: getCommentBeforeLikeResponse.json().dislikeCount
          }));
        }
      );

      it(
        `should return ${HttpCode.OK} with removed user's like comment`,
        async () => {
          const getCommentBeforeLikeResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                commentId
              )}`
            )
            .headers({ authorization: `Bearer ${token}` });
          const likeCommentResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId });

          expect(likeCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(likeCommentResponse.json()).toEqual(expect.objectContaining({
            likeCount: String(Number(getCommentBeforeLikeResponse.json().likeCount) - 1),
            dislikeCount: getCommentBeforeLikeResponse.json().dislikeCount
          }));
        }
      );

      it(
        `should return ${HttpCode.OK} with disliked comment`,
        async () => {
          const getCommentBeforeLikeResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                commentId
              )}`
            )
            .headers({ authorization: `Bearer ${token}` });
          const dislikeCommentResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId, isLike: false });

          expect(dislikeCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(dislikeCommentResponse.json()).toEqual(expect.objectContaining({
            likeCount: getCommentBeforeLikeResponse.json().likeCount,
            dislikeCount: String(Number(getCommentBeforeLikeResponse.json().dislikeCount) + 1)
          }));
        }
      );

      it(
        `should return ${HttpCode.OK} with removed user's dislike comment`,
        async () => {
          const getCommentBeforeLikeResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                commentId
              )}`
            )
            .headers({ authorization: `Bearer ${token}` });
          const dislikeCommentResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId, isLike: false });

          expect(dislikeCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(dislikeCommentResponse.json()).toEqual(expect.objectContaining({
            likeCount: getCommentBeforeLikeResponse.json().likeCount,
            dislikeCount: String(Number(getCommentBeforeLikeResponse.json().dislikeCount) - 1)
          }));
        }
      );

      it(
        `should return ${HttpCode.OK} with switched like to dislike comment`,
        async () => {
          const getCommentBeforeLikeResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                commentId
              )}`
            )
            .headers({ authorization: `Bearer ${token}` });
          const likeCommentResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId, isLike: true });
          const dislikeCommentResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId, isLike: false });
          await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId, isLike: false });
          expect(likeCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(dislikeCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(likeCommentResponse.json()).toEqual(expect.objectContaining({
            likeCount: String(Number(getCommentBeforeLikeResponse.json().likeCount) + 1),
            dislikeCount: getCommentBeforeLikeResponse.json().dislikeCount
          }));
          expect(dislikeCommentResponse.json()).toEqual(expect.objectContaining({
            likeCount: String(Number(likeCommentResponse.json().likeCount) - 1),
            dislikeCount: String(Number(likeCommentResponse.json().dislikeCount) + 1)
          }));
        }
      );

      it(
        `should return ${HttpCode.OK} with switched dislike to like comment`,
        async () => {
          const getCommentBeforeLikeResponse = await app.inject()
            .get(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.$ID.replace(
                ':id',
                commentId
              )}`
            )
            .headers({ authorization: `Bearer ${token}` });
          const dislikeCommentResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId, isLike: false });
          const likeCommentResponse = await app.inject()
            .put(
              `${ENV.APP.API_PATH}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`
            )
            .headers({ authorization: `Bearer ${token}` })
            .body({ commentId, isLike: true });

          expect(likeCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(dislikeCommentResponse.statusCode).toBe(HttpCode.OK);
          expect(dislikeCommentResponse.json()).toEqual(expect.objectContaining({
            likeCount: getCommentBeforeLikeResponse.json().likeCount,
            dislikeCount: String(Number(getCommentBeforeLikeResponse.json().dislikeCount) + 1)
          }));
          expect(likeCommentResponse.json()).toEqual(expect.objectContaining({
            likeCount: String(Number(dislikeCommentResponse.json().likeCount) + 1),
            dislikeCount: String(Number(dislikeCommentResponse.json().dislikeCount) - 1)
          }));
        }
      );
    }
  );
});
