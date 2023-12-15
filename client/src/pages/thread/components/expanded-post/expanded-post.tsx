import PropTypes from 'prop-types';

import { Modal } from '~/libs/components/modal/modal.jsx';
import { Post } from '~/libs/components/post/post.jsx';
import { Spinner } from '~/libs/components/spinner/spinner.jsx';
import { useCallback, useDispatch, useSelector } from '~/libs/hooks/hooks.js';
import { AddComment, Comment } from '~/pages/thread/components/components.js';
import { actions as threadActionCreator } from '~/slices/thread/thread.js';

import { getSortedComments } from './libs/helpers/helpers.js';

const ExpandedPost = ({ onSharePost }) => {
  const dispatch = useDispatch();
  const { post } = useSelector(state => ({
    post: state.posts.expandedPost
  }));

  const handlePostLike = useCallback(
    id => dispatch(threadActionCreator.likePost(id)),
    [dispatch]
  );

  const handleCommentAdd = useCallback(
    commentPayload => dispatch(threadActionCreator.addComment(commentPayload)),
    [dispatch]
  );

  const handleExpandedPostToggle = useCallback(
    id => dispatch(threadActionCreator.toggleExpandedPost(id)),
    [dispatch]
  );

  const handleExpandedPostClose = useCallback(
    () => handleExpandedPostToggle(),
    [handleExpandedPostToggle]
  );

  const sortedComments = getSortedComments(post.comments ?? []);

  return (
    <Modal isOpen onClose={handleExpandedPostClose}>
      {post ? (
        <>
          <Post
            post={post}
            onPostLike={handlePostLike}
            onExpandedPostToggle={handleExpandedPostToggle}
            onSharePost={onSharePost}
          />
          <div>
            <h3>Comments</h3>
            {sortedComments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <AddComment postId={post.id} onCommentAdd={handleCommentAdd} />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </Modal>
  );
};

ExpandedPost.propTypes = {
  onSharePost: PropTypes.func.isRequired
};

export { ExpandedPost };
