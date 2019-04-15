import { THREAD_ACTION } from './threadActionTypes';
import * as postService from 'src/services/postService'

export const loadAllPosts = () => {
    return async (dispatch) => {
        const posts = await postService.getAllPosts();
        dispatch({
            type: THREAD_ACTION,
            posts
        })
    }
}
