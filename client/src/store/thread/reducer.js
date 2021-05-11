import { createReducer } from '@reduxjs/toolkit';
import { setPosts, addMorePosts, addPost, setExpandedPost } from './actions';

const initialState = {
  posts: [],
  expandedPost: null,
  hasMorePosts: true
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setPosts, (state, action) => {
    const { posts } = action.payload;

    state.posts = posts;
    state.hasMorePosts = Boolean(posts.length);
  });
  builder.addCase(addMorePosts, (state, action) => {
    const { posts } = action.payload;

    state.posts = state.posts.concat(posts);
    state.hasMorePosts = Boolean(posts.length);
  });
  builder.addCase(addPost, (state, action) => {
    const { post } = action.payload;

    state.posts = [post, ...state.posts];
  });
  builder.addCase(setExpandedPost, (state, action) => {
    const { post } = action.payload;

    state.expandedPost = post;
  });
});

export { reducer };
