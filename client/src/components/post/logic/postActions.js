import * as postService from 'src/services/postService';
import { ADD_POST } from './postActionTypes';

export const addPost = request => async (dispatch, getRootState) => {
    const post = await postService.addPost(request);
    if (post && post.id) {
        const fullPostInfo = await postService.getPost(post.id);
        dispatch({
            type: ADD_POST,
            post: fullPostInfo
        });
    }
};
