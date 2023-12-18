import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  type GetPostByIdResponseDto,
  type GetPostsByFilterResponseDto
} from '~/packages/post/post.js';

import { POSTS_PER_PAGE } from '../../pages/thread/libs/common/constants.js';
import {
  addComment,
  applyPost,
  createPost,
  likePost,
  loadMorePosts,
  loadPosts,
  toggleExpandedPost
} from './actions.js';

type State = {
  posts: GetPostsByFilterResponseDto;
  expandedPost: GetPostByIdResponseDto | null;
  hasMorePosts: boolean;
  count: number;
  from: number;
};

const initialState: State = {
  posts: [],
  expandedPost: null,
  hasMorePosts: true,
  count: POSTS_PER_PAGE,
  from: 0
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'thread',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      const { posts } = action.payload;

      state.posts = posts;
      state.hasMorePosts = posts.length > 0;
      state.from = initialState.count;
    });
    builder.addCase(loadMorePosts.pending, state => {
      state.hasMorePosts = false;
    });
    builder.addCase(loadMorePosts.fulfilled, (state, action) => {
      const { posts } = action.payload;

      state.posts = [...state.posts, ...posts];
      state.hasMorePosts = posts.length > 0;
      state.from += posts.length;
    });
    builder.addCase(toggleExpandedPost.fulfilled, (state, action) => {
      const { post } = action.payload;

      state.expandedPost = post;
    });
    builder.addMatcher(
      isAnyOf(likePost.fulfilled, addComment.fulfilled),
      (state, action) => {
        const { posts, expandedPost } = action.payload;
        state.posts = posts;
        state.expandedPost = expandedPost;
      }
    );
    builder.addMatcher(
      isAnyOf(applyPost.fulfilled, createPost.fulfilled),
      (state, action) => {
        const { post } = action.payload;

        if (post) {
          state.posts = [post, ...state.posts];
        }
      }
    );
  }
});

export { actions, name, reducer };
