import * as postService from 'src/services/postService';
import {
    ADD_POST, SET_ALL_POSTS, TOGGLE_EXPANDED_POST_VISIBILITY, ADD_COMMENT, SET_SHARED_POST_INFO
} from './postActionTypes';

export const addPost = request => async (dispatch) => {
    const post = await postService.addPost(request);
    if (post && post.id) {
        const fullPostInfo = await postService.getPost(post.id);
        dispatch({
            type: ADD_POST,
            post: fullPostInfo
        });
    }
};

export const addComment = request => async (dispatch) => {
    // const comment = await postService.addComment(request);
    dispatch({
        type: ADD_COMMENT,
        comment: request.body
    });
};

export const likePost = postId => async (dispatch, getRootState) => {
    const { id } = await postService.likePost(postId);
    const diff = id ? 1 : -1;

    const { posts: { posts } } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : {
        ...post,
        likeCount: Number(post.likeCount) + diff
    }));

    dispatch({ type: SET_ALL_POSTS, posts: updated });
};

export const toggleExpandedPost = postId => async (dispatch, getRootState) => {
    const { posts } = getRootState();
    const newValue = (posts.expandedPostId !== postId)
        ? postId
        : undefined;
    dispatch({ type: TOGGLE_EXPANDED_POST_VISIBILITY, postId: newValue });
};

export const loadPostComments = postId => async (dispatch, getRootState) => {
    const fullPostInfo = await postService.getPost(postId);
    const { posts } = getRootState();
    const newPosts = [...posts.posts];
    const postIndex = newPosts.findIndex(post => post.id === postId);
    const post = newPosts[postIndex];
    newPosts[postIndex] = Object.assign({}, post, {
        comments: fullPostInfo.comments
    });
    dispatch({ type: SET_ALL_POSTS, posts: newPosts });
};

export const getPostByHash = hash => async (dispatch) => {
    const fullPostInfo = await postService.getPostByHash(hash);
    dispatch({ type: SET_SHARED_POST_INFO, post: fullPostInfo });
    return fullPostInfo;
};
