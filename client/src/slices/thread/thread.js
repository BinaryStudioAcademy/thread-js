import {
  loadPosts,
  loadMorePosts,
  applyPost,
  createPost,
  toggleExpandedPost,
  likePost,
  addComment
} from './actions.js';
import { actions } from './thread.slice.js';

const allActions = {
  ...actions,
  loadPosts,
  loadMorePosts,
  applyPost,
  createPost,
  toggleExpandedPost,
  likePost,
  addComment
};

export { allActions as actions };
export { reducer } from './thread.slice.js';
