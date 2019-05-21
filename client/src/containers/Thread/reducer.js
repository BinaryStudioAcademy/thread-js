import {
    SET_ALL_POSTS,
    LOAD_MORE_POSTS,
    ADD_POST,
    TOGGLE_EXPANDED_POST_VISIBILITY
} from './actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ALL_POSTS:
            return {
                ...state,
                posts: action.posts,
                hasMorePosts: Boolean(action.posts.length)
            };
        case LOAD_MORE_POSTS:
            return {
                ...state,
                posts: [...(state.posts || []), ...action.posts],
                hasMorePosts: Boolean(action.posts.length)
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.post, ...state.posts]
            };
        case TOGGLE_EXPANDED_POST_VISIBILITY:
            return {
                ...state,
                expandedPostId: action.postId
            };
        default:
            return state;
    }
};
