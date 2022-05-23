import { login, register, logout, loadCurrentUser } from './profile/actions.js';
import {
  loadPosts,
  loadMorePosts,
  applyPost,
  createPost,
  toggleExpandedPost,
  likePost,
  addComment
} from './thread/actions.js';

export const profileActionCreator = {
  login,
  register,
  logout,
  loadCurrentUser
};

export const threadActionCreator = {
  loadPosts,
  loadMorePosts,
  applyPost,
  createPost,
  toggleExpandedPost,
  likePost,
  addComment
};
