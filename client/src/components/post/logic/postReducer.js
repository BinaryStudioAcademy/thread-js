import {
    SET_ALL_POSTS, ADD_POST,
    TOGGLE_EXPANDED_POST_VISIBILITY
} from './postActionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ALL_POSTS: {
            return Object.assign({}, state, {
                posts: action.posts
            });
        }
        case ADD_POST:
            return Object.assign({}, state, {
                posts: [action.post, ...state.posts]
            });
        case TOGGLE_EXPANDED_POST_VISIBILITY: {
            return Object.assign({}, state, {
                expandedPostId: action.postId
            });
        }
        default:
            return state;
    }
};
