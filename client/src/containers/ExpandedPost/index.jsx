import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Comment as CommentUI, Header } from 'semantic-ui-react';
import moment from 'moment';
import {
  likePost,
  toggleExpandedPost,
  addComment
} from 'src/containers/Thread/actions';
import Post from 'src/components/Post';
import Comment from 'src/components/Comment';
import AddComment from 'src/components/AddComment';
import Spinner from 'src/components/Spinner';

const ExpandedPost = ({
  sharePost
}) => {
  const dispatch = useDispatch();
  const { post } = useSelector(state => ({
    post: state.posts.expandedPost
  }));

  const handlePostLike = useCallback(id => {
    dispatch(likePost(id));
  }, [dispatch]);

  const handleCommentAdd = useCallback(commentPayload => {
    dispatch(addComment(commentPayload));
  }, [dispatch]);

  const handleExpandedPostToggle = useCallback(id => {
    dispatch(toggleExpandedPost(id));
  }, [dispatch]);

  return (
    <Modal dimmer="blurring" centered={false} open onClose={handleExpandedPostToggle}>
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
