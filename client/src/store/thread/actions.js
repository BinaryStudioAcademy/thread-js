import { createAction } from '@reduxjs/toolkit';
import {
  comment as commentService,
  post as postService
} from 'src/services/services';

const ActionType = {
  ADD_POST: 'thread/add-post',
  LOAD_MORE_POSTS: 'thread/load-more-posts',
  SET_ALL_POSTS: 'thread/set-all-posts',
  SET_EXPANDED_POST: 'thread/set-expanded-post'
};

const setPosts = createAction(ActionType.SET_ALL_POSTS, posts => ({
  payload: {
    posts
  }
}));

const addMorePosts = createAction(ActionType.LOAD_MORE_POSTS, posts => ({
  payload: {
    posts
  }
}));

const addPost = createAction(ActionType.ADD_POST, post => ({
  payload: {
    post
  }
}));

const setExpandedPost = createAction(ActionType.SET_EXPANDED_POST, post => ({
  payload: {
    post
  }
}));

const loadPosts = filter => async dispatch => {
  const posts = await postService.getAllPosts(filter);
  dispatch(setPosts(posts));
};

const loadMorePosts = filter => async (dispatch, getRootState) => {
  const {
    posts: { posts }
  } = getRootState();
  const loadedPosts = await postService.getAllPosts(filter);
  const filteredPosts = loadedPosts.filter(
    post => !(posts && posts.some(loadedPost => post.id === loadedPost.id))
  );
  dispatch(addMorePosts(filteredPosts));
};

const applyPost = postId => async dispatch => {
  const post = await postService.getPost(postId);
  dispatch(addPost(post));
};

const createPost = post => async dispatch => {
  const { id } = await postService.addPost(post);
  const newPost = await postService.getPost(id);
  dispatch(addPost(newPost));
};

const toggleExpandedPost = postId => async dispatch => {
  const post = postId ? await postService.getPost(postId) : undefined;
  dispatch(setExpandedPost(post));
};

const likePost = postId => async (dispatch, getRootState) => {
  const { id } = await postService.likePost(postId);
  const diff = id ? 1 : -1; // if ID exists then the post was liked, otherwise - like was removed

  const mapLikes = post => ({
    ...post,
    likeCount: Number(post.likeCount) + diff // diff is taken from the current closure
  });

  const {
    posts: { posts, expandedPost }
  } = getRootState();
  const updated = posts.map(post => (post.id !== postId ? post : mapLikes(post)));

  dispatch(setPosts(updated));

  if (expandedPost && expandedPost.id === postId) {
    dispatch(setExpandedPost(mapLikes(expandedPost)));
  }
};

const addComment = request => async (dispatch, getRootState) => {
  const { id } = await commentService.addComment(request);
  const comment = await commentService.getComment(id);

  const mapComments = post => ({
    ...post,
    commentCount: Number(post.commentCount) + 1,
    comments: [...(post.comments || []), comment] // comment is taken from the current closure
  });

  const {
    posts: { posts, expandedPost }
  } = getRootState();
  const updated = posts.map(post => (post.id !== comment.postId ? post : mapComments(post)));

  dispatch(setPosts(updated));

  if (expandedPost && expandedPost.id === comment.postId) {
    dispatch(setExpandedPost(mapComments(expandedPost)));
  }
};

export {
  setPosts,
  addMorePosts,
  addPost,
  setExpandedPost,
  loadPosts,
  loadMorePosts,
  applyPost,
  createPost,
  toggleExpandedPost,
  likePost,
  addComment
};
