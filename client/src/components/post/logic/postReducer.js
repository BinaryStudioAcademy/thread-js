import { SET_ALL_POSTS, ADD_POST, ADD_LIKE } from './postActionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ALL_POSTS:
            return {
                posts: action.posts
            };
        case ADD_POST:
            return {
                posts: [action.post, ...state.posts]
            };
        case ADD_LIKE: {
            const newPosts = [...state.posts];
            const { postId } = action;
            const editedPost = newPosts.find(post => post.id === postId);
            const newLikeCount = Number(editedPost.likeCount) + 1;
            editedPost.likeCount = newLikeCount.toString();
            return {
                posts: newPosts
            };
        }
        default:
            return state;
    }
};
