import { SET_ALL_POSTS } from 'src/components/post/logic/postActionTypes';
import * as postService from 'src/services/postService';

const loadAllPosts = () => async (dispatch) => {
    const posts = await postService.getAllPosts();
    dispatch({
        type: SET_ALL_POSTS,
        posts
    });
};

export default {
    loadAllPosts
};
