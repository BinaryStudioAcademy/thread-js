import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import * as threadActions from './actions';

const initialState = {
  posts: [],
  expandedPost: null,
  hasMorePosts: true
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(threadActions.loadPosts.fulfilled, (state, action) => {
    const { posts } = action.payload;

    state.posts = posts;
    state.hasMorePosts = Boolean(posts.length);
  });
  builder.addCase(threadActions.loadMorePosts.pending, state => {
    state.hasMorePosts = null;
  });
  builder.addCase(threadActions.loadMorePosts.fulfilled, (state, action) => {
    const { posts } = action.payload;

    state.posts = state.posts.concat(posts);
    state.hasMorePosts = Boolean(posts.length);
  });
  builder.addCase(threadActions.toggleExpandedPost.fulfilled, (state, action) => {
    const { post } = action.payload;

    state.expandedPost = post;
  });
  builder.addMatcher(isAnyOf(threadActions.likePost.fulfilled, threadActions.addComment.fulfilled), (state, action) => {
    const { posts, expandedPost } = action.payload;
    state.posts = posts;
    state.expandedPost = expandedPost;
  });
  builder.addMatcher(isAnyOf(
    threadActions.applyPost.fulfilled,
    threadActions.createPost.fulfilled
  ), (state, action) => {
    const { post } = action.payload;

    state.posts = [post, ...state.posts];
  });
});

export { reducer };
