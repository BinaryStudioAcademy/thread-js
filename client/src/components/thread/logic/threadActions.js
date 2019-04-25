import { SET_ALL_POSTS } from 'src/components/post/logic/postActionTypes';
import * as postService from 'src/services/postService';

export const loadAllPosts = () => async (dispatch) => {
    const posts = await postService.getAllPosts();
    dispatch({
        type: SET_ALL_POSTS,
        posts
    });
};
