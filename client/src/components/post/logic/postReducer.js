import {
    SET_ALL_POSTS, ADD_POST,
    TOGGLE_EXPANDED_POST_VISIBILITY
} from './postActionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ALL_POSTS:
            return {
                ...state,
                posts: action.posts
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
