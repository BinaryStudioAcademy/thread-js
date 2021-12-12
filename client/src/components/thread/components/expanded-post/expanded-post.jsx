import PropTypes from 'prop-types';
import { useCallback, useDispatch, useSelector } from 'hooks/hooks';
import { threadActionCreator } from 'store/actions';
import { Spinner, Post, Modal, Comment as CommentUI } from 'components/common/common';
import AddComment from '../add-comment/add-comment';
import Comment from '../comment/comment';
import { getSortedComments } from './helpers/helpers';

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

  const sortedComments = getSortedComments(post.comments ?? []);

  return (
    <Modal
      dimmer="blurring"
      centered={false}
      open
      onClose={handleExpandedPostClose}
    >
      {post ? (
        <Modal.Content>
          <Post
            post={post}
            onPostLike={handlePostLike}
            onExpandedPostToggle={handleExpandedPostToggle}
            sharePost={sharePost}
          />
          <CommentUI.Group style={{ maxWidth: '100%' }}>
            <h3>Comments</h3>
            {sortedComments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
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
