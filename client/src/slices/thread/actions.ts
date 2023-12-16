import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type CommentWithUserNestedRelations,
  type CreateCommentRequestDto
} from '~/packages/comment/comment.js';
import {
  type CreatePostRequestDto,
  type GetPostByIdResponseDto,
  type GetPostsByFilterRequestDto,
  type GetPostsByFilterResponseDto,
  type Post,
  type PostWithCommentImageUserNestedRelationsWithCount,
  type PostWithImageUserNestedRelationsWithCount
} from '~/packages/post/post.js';
import { type UserWithImageRelation } from '~/packages/user/user.js';

import { ActionType } from './common.js';

const loadPosts = createAsyncThunk<
  Record<'posts', GetPostsByFilterResponseDto>,
  GetPostsByFilterRequestDto,
  AsyncThunkConfig
>(
  ActionType.SET_ALL_POSTS,
  async (filters, { getState, extra: { postApi } }) => {
    const {
      posts: { count }
    } = getState();

    const posts = await postApi.getByFilter({
      ...filters,
      from: 0,
      count
    });

    return { posts };
  }
);

const loadMorePosts = createAsyncThunk<
  Record<'posts', GetPostsByFilterResponseDto>,
  GetPostsByFilterRequestDto,
  AsyncThunkConfig
>(
  ActionType.LOAD_MORE_POSTS,
  async (filters, { getState, extra: { postApi } }) => {
    const {
      posts: { posts }
    } = getState();
    const loadedPosts = await postApi.getByFilter(filters);
    const filteredPosts = loadedPosts.filter(
      post => !posts.some(loadedPost => post.id === loadedPost.id)
    );

    return { posts: filteredPosts };
  }
);

const applyPost = createAsyncThunk<
  Record<'post', GetPostByIdResponseDto>,
  Post,
  AsyncThunkConfig
>(
  ActionType.ADD_POST,
  async ({ id: postId, userId }, { getState, extra: { postApi } }) => {
    const {
      profile: { user }
    } = getState();

    if (userId === (user as UserWithImageRelation).id) {
      return { post: null };
    }

    const post = await postApi.getById(postId);

    return { post };
  }
);

const createPost = createAsyncThunk<
  Record<'post', GetPostByIdResponseDto>,
  CreatePostRequestDto,
  AsyncThunkConfig
>(ActionType.ADD_POST, async (post, { extra: { postApi } }) => {
  const { id } = await postApi.create(post);
  const newPost = await postApi.getById(id);

  return { post: newPost };
});

const toggleExpandedPost = createAsyncThunk<
  Record<'post', GetPostByIdResponseDto | null>,
  number | null,
  AsyncThunkConfig
>(ActionType.SET_EXPANDED_POST, async (postId, { extra: { postApi } }) => {
  const post = postId ? await postApi.getById(postId) : null;

  return { post };
});

const likePost = createAsyncThunk<
  {
    posts: PostWithImageUserNestedRelationsWithCount[];
    expandedPost: PostWithCommentImageUserNestedRelationsWithCount | null;
  },
  number,
  AsyncThunkConfig
>(ActionType.REACT, async (postId, { getState, extra: { postApi } }) => {
  const { id } = await postApi.likePost(postId);
  const diff = id ? 1 : -1; // if ID exists then the post was liked, otherwise - like was removed

  const mapLikes = (
    post: PostWithImageUserNestedRelationsWithCount
  ): PostWithImageUserNestedRelationsWithCount => ({
    ...post,
    likeCount: Number(post.likeCount) + diff // diff is taken from the current closure
  });

  const {
    posts: { posts, expandedPost }
  } = getState();
  const updated = posts.map(post =>
    post.id === postId ? mapLikes(post) : post
  );
  const updatedExpandedPost =
    expandedPost?.id === postId ? mapLikes(expandedPost) : null;

  return {
    posts: updated,
    expandedPost:
      updatedExpandedPost as PostWithCommentImageUserNestedRelationsWithCount
  };
});

const addComment = createAsyncThunk<
  {
    posts: PostWithImageUserNestedRelationsWithCount[];
    expandedPost: PostWithCommentImageUserNestedRelationsWithCount | null;
  },
  CreateCommentRequestDto,
  AsyncThunkConfig
>(ActionType.COMMENT, async (request, { getState, extra: { commentApi } }) => {
  const { id } = await commentApi.addComment(request);
  const comment = await commentApi.getComment(id);

  const mapComments = (
    post: PostWithCommentImageUserNestedRelationsWithCount
  ): PostWithCommentImageUserNestedRelationsWithCount => ({
    ...post,
    commentCount: Number(post.commentCount) + 1,
    comments: [...(post.comments || []), comment as NonNullable<typeof comment>] // comment is taken from the current closure
  });

  const {
    posts: { posts, expandedPost }
  } = getState();
  const updated = posts.map(post =>
    post.id === (comment as NonNullable<typeof comment>).postId
      ? mapComments(post as PostWithCommentImageUserNestedRelationsWithCount)
      : post
  );

  const updatedExpandedPost =
    expandedPost?.id === (comment as CommentWithUserNestedRelations).postId
      ? mapComments(expandedPost)
      : null;

  return {
    posts: updated,
    expandedPost: updatedExpandedPost
  };
});

export {
  addComment,
  applyPost,
  createPost,
  likePost,
  loadMorePosts,
  loadPosts,
  toggleExpandedPost
};
