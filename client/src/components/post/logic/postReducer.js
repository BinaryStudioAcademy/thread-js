import { SET_ALL_POSTS, ADD_POST } from "./postActionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ALL_POSTS:
            return {
                posts: action.posts
            }
        case ADD_POST:
            return {
                posts: [...state.posts, action.post]
            }
        default:
            return state
    }
}
