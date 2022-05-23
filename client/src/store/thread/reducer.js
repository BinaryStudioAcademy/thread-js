import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import {
  loadPosts,
  loadMorePosts,
  toggleExpandedPost,
  likePost,
  addComment,
  applyPost,
  createPost
} from './actions.js';

const initialState = {
  posts: [],
  expandedPost: null,
  hasMorePosts: true
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(loadPosts.fulfilled, (state, action) => {
    const { posts } = action.payload;

    state.posts = posts;
    state.hasMorePosts = Boolean(posts.length);
  });
  builder.addCase(loadMorePosts.pending, state => {
    state.hasMorePosts = null;
  });
  builder.addCase(loadMorePosts.fulfilled, (state, action) => {
    const { posts } = action.payload;

    state.posts = state.posts.concat(posts);
    state.hasMorePosts = Boolean(posts.length);
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

      state.posts = [post, ...state.posts];
    }
  );
});

export { reducer };
