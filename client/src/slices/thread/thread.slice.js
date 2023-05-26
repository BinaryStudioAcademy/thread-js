import { isAnyOf, createSlice } from '@reduxjs/toolkit';
import {
  loadPosts,
  loadMorePosts,
  toggleExpandedPost,
  likePost,
  addComment,
  applyPost,
  createPost
} from './actions';
import { POSTS_PER_PAGE } from '../../pages/thread/libs/common/constants';

const initialState = {
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
      state.hasMorePosts = Boolean(posts.length);
      state.from = initialState.count;
    });
    builder.addCase(loadMorePosts.pending, state => {
      state.hasMorePosts = null;
    });
    builder.addCase(loadMorePosts.fulfilled, (state, action) => {
      const { posts } = action.payload;
      state.posts = state.posts.concat(posts);
      state.hasMorePosts = Boolean(posts.length);
      state.from += initialState.count;
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

export { reducer, actions, name };
