import * as postService from 'src/services/postService';
import {
    ADD_POST, SET_ALL_POSTS, TOGGLE_EXPANDED_POST_VISIBILITY
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

export const addComment = () => {};
// export const addComment = request => async (dispatch) => {
//     const comment = await postService.addComment(request);
//     dispatch({
//         type: ADD_COMMENT,
//         comment
//     });
// };

export const likePost = postId => async (dispatch, getRootState) => {
    const result = await postService.likePost(postId);
    const { posts } = getRootState();
    const newPosts = [...posts.posts];
    const postIndex = newPosts.findIndex(post => post.id === postId);
    const post = newPosts[postIndex];
    const { likeCount } = post;
    const diff = (result && result.id) ? 1 : -1;
    const newLikeCount = Number(likeCount) + diff;
    newPosts[postIndex] = Object.assign({}, post, {
        likeCount: newLikeCount.toString()
    });
    dispatch({ type: SET_ALL_POSTS, posts: newPosts });
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
