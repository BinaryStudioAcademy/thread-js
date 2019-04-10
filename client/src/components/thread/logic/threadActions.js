import { THREAD_ACTION } from './threadActionTypes';
import { getAllPosts } from '../../../services/postService'

export const loadAllPosts = () => {
    return async (dispatch) => {
        const posts = await getAllPosts();
        dispatch({
            type: THREAD_ACTION,
            posts
        })
    }
}
