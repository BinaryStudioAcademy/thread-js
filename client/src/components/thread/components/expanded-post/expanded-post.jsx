import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Comment as CommentUI, Header } from 'semantic-ui-react';
import moment from 'moment';
import { threadActionCreator } from 'src/store/actions';
import { Spinner, Post } from 'src/components/common/common';
import AddComment from '../add-comment/add-comment';
import Comment from '../comment/comment';

const ExpandedPost = ({
  sharePost
}) => {
  const dispatch = useDispatch();
  const { post } = useSelector(state => ({
    post: state.posts.expandedPost
  }));

  const handlePostLike = useCallback(id => (
    dispatch(threadActionCreator.likePost(id))
  ), [dispatch]);

  const handleCommentAdd = useCallback(commentPayload => (
    dispatch(threadActionCreator.addComment(commentPayload))
  ), [dispatch]);

  const handleExpandedPostToggle = useCallback(id => (
    dispatch(threadActionCreator.toggleExpandedPost(id))
  ), [dispatch]);

  const handleExpandedPostClose = () => handleExpandedPostToggle();

  return (
    <Modal dimmer="blurring" centered={false} open onClose={handleExpandedPostClose}>
      {post ? (
        <Modal.Content>
          <Post
            post={post}
            onPostLike={handlePostLike}
            onExpandedPostToggle={handleExpandedPostToggle}
            sharePost={sharePost}
          />
          <CommentUI.Group style={{ maxWidth: '100%' }}>
            <Header as="h3" dividing>
              Comments
            </Header>
            {post.comments
              ?.sort((c1, c2) => moment(c1.createdAt).diff(c2.createdAt))
              .map(comment => <Comment key={comment.id} comment={comment} />)}
            <AddComment postId={post.id} onCommentAdd={handleCommentAdd} />
          </CommentUI.Group>
        </Modal.Content>
      ) : (
        <Spinner />
      )}
    </Modal>
  );
};

ExpandedPost.propTypes = {
  sharePost: PropTypes.func.isRequired
};

export default ExpandedPost;
