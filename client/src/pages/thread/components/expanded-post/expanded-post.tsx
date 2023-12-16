import { Modal, Post, Spinner } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback
} from '~/libs/hooks/hooks.js';
import { type CreateCommentRequestDto } from '~/packages/comment/comment.js';
import { AddComment, Comment } from '~/pages/thread/components/components.js';
import { actions as threadActionCreator } from '~/slices/thread/thread.js';

import { getSortedComments } from './libs/helpers/helpers.js';

type Properties = {
  onSharePost: (id: number) => void;
};

const ExpandedPost: React.FC<Properties> = ({ onSharePost }) => {
  const dispatch = useAppDispatch();
  const { post } = useAppSelector(state => ({
    post: state.posts.expandedPost
  }));

  const handlePostLike = useCallback(
    (id: number) => dispatch(threadActionCreator.likePost(id)),
    [dispatch]
  );

  const handleCommentAdd = useCallback(
    (commentPayload: CreateCommentRequestDto) => {
      return dispatch(threadActionCreator.addComment(commentPayload));
    },
    [dispatch]
  );

  const handleExpandedPostToggle = useCallback(
    (id: number | null) => dispatch(threadActionCreator.toggleExpandedPost(id)),
    [dispatch]
  );

  const handleExpandedPostClose = useCallback(
    () => handleExpandedPostToggle(null),
    [handleExpandedPostToggle]
  );

  const sortedComments = getSortedComments(
    (post as NonNullable<typeof post>).comments ?? []
  );

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

export { ExpandedPost };
