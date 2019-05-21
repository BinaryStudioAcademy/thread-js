import * as postService from 'src/services/postService';
import * as commentService from 'src/services/commentService';
import {
    ADD_POST,
    LOAD_MORE_POSTS,
    SET_ALL_POSTS,
    SET_EXPANDED_POST
} from './actionTypes';

const setPostsAction = posts => ({
    type: SET_ALL_POSTS,
    posts
});

const addMorePostsAction = posts => ({
    type: LOAD_MORE_POSTS,
    posts
});

const addPostAction = post => ({
    type: ADD_POST,
    post
});

const setExpandedPostAction = post => ({
    type: SET_EXPANDED_POST,
    post
});

export const loadPosts = filter => async (dispatch) => {
    const posts = await postService.getAllPosts(filter);
    dispatch(setPostsAction(posts));
};

export const loadMorePosts = filter => async (dispatch) => {
    const posts = await postService.getAllPosts(filter);
    dispatch(addMorePostsAction(posts));
};

export const applyPost = postId => async (dispatch) => {
    const post = await postService.getPost(postId);
    dispatch(addPostAction(post));
};

export const addPost = post => async (dispatch) => {
    const { id } = await postService.addPost(post);
    const newPost = await postService.getPost(id);
    dispatch(addPostAction(newPost));
};

export const likePost = postId => async (dispatch, getRootState) => {
    const { id } = await postService.likePost(postId);
    const diff = id ? 1 : -1; // if ID exists then the post was liked otherwise - disliked

    const { posts: { posts, expandedPost } } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : {
        ...post,
        likeCount: Number(post.likeCount) + diff
    }));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === postId) {
        dispatch(setExpandedPostAction({
            ...expandedPost,
            likeCount: Number(expandedPost.likeCount) + diff
        }));
    }
};

export const toggleExpandedPost = postId => async (dispatch) => {
    const post = postId ? await postService.getPost(postId) : undefined;
    dispatch(setExpandedPostAction(post));
};

export const addComment = request => async (dispatch, getRootState) => {
    const { id } = await commentService.addComment(request);
    const comment = await commentService.getComment(id);

    const { posts: { posts, expandedPost } } = getRootState();
    const updated = posts.map(post => (post.id !== comment.postId ? post : {
        ...post,
        commentCount: Number(post.commentCount) + 1,
        comments: [...(post.comments || []), comment]
    }));

    if (expandedPost && expandedPost.id === comment.postId) {
        dispatch(setExpandedPostAction({
            ...expandedPost,
            commentCount: Number(expandedPost.commentCount) + 1,
            comments: [...(expandedPost.comments || []), comment]
        }));
    }

    dispatch(setPostsAction(updated));
};
