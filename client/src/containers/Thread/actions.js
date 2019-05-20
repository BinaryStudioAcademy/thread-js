import * as postService from 'src/services/postService';
import * as commentService from 'src/services/commentService';
import {
    ADD_POST, SET_ALL_POSTS, TOGGLE_EXPANDED_POST_VISIBILITY, SET_SHARED_POST_INFO
} from './actionTypes';

export const addPost = request => async (dispatch) => {
    const { id } = await postService.addPost(request);
    const post = await postService.getPost(id);
    dispatch({ type: ADD_POST, post });
};

export const addComment = request => async (dispatch, getRootState) => {
    const { id } = await commentService.addComment(request);
    const comment = await commentService.getComment(id);

    const { posts: { posts } } = getRootState();
    const updated = posts.map(post => (post.id !== comment.postId ? post : {
        ...post,
        commentCount: Number(post.commentCount) + 1,
        comments: [...(post.comments || []), comment]
    }));

    dispatch({ type: SET_ALL_POSTS, posts: updated });
};

export const likePost = postId => async (dispatch, getRootState) => {
    const { id } = await postService.likePost(postId);
    const diff = id ? 1 : -1;

    const { posts: { posts } } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : {
        ...post,
        likeCount: Number(post.likeCount) + diff
    }));

    dispatch({ type: SET_ALL_POSTS, posts: updated });
};

export const toggleExpandedPost = postId => async (dispatch) => {
    dispatch({
        type: TOGGLE_EXPANDED_POST_VISIBILITY,
        postId
    });
};

export const loadPostComments = postId => async (dispatch, getRootState) => {
    const { id, comments } = await postService.getPost(postId);
    const { posts: { posts } } = getRootState();

    const updated = posts.map(post => (post.id !== id ? post : {
        ...post,
        comments
    }));

    dispatch({ type: SET_ALL_POSTS, posts: updated });
};

export const getPostByHash = hash => async (dispatch) => {
    const fullPostInfo = await postService.getPostByHash(hash);
    dispatch({ type: SET_SHARED_POST_INFO, post: fullPostInfo });
    return fullPostInfo;
};


export const loadAllPosts = () => async (dispatch) => {
    const posts = await postService.getAllPosts();
    dispatch({
        type: SET_ALL_POSTS,
        posts
    });
};
