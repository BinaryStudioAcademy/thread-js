import * as postService from 'src/services/postService';
import { ADD_POST, ADD_LIKE } from './postActionTypes';

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

export const likePost = postId => async (dispatch) => {
    await postService.likePost(postId);
    dispatch({
        type: ADD_LIKE,
        postId
    });
};
