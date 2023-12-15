import PropTypes from 'prop-types';

import { Button } from '~/libs/components/button/button.jsx';
import { Input } from '~/libs/components/input/input.jsx';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { CommentPayloadKey } from '~/packages/comment/comment.js';

import { DEFAULT_ADD_COMMENT_PAYLOAD } from './libs/constants/constants.js';

const AddComment = ({ postId, onCommentAdd }) => {
  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_ADD_COMMENT_PAYLOAD
  });

  const handleAddComment = useCallback(
    values => {
      if (!values.body) {
        return;
      }
      onCommentAdd({ postId, body: values.body }).then(() => reset());
    },
    [postId, reset, onCommentAdd]
  );

  return (
    <form name="comment" onSubmit={handleSubmit(handleAddComment)}>
      <Input
        name={CommentPayloadKey.BODY}
        placeholder="Type a comment..."
        rows={10}
        control={control}
      />
      <Button type={'submit'} isPrimary>
        Post comment
      </Button>
    </form>
  );
};

AddComment.propTypes = {
  onCommentAdd: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired
};

export { AddComment };
