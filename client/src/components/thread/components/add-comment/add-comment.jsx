
import PropTypes from 'prop-types';
import { useAppForm, useCallback } from 'hooks/hooks.js';
import { ButtonType, CommentPayloadKey } from 'common/enums/enums.js';
import { Button, Input } from 'components/common/common.js';
import { DEFAULT_ADD_COMMENT_PAYLOAD } from './common/constants.js';

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
      <Button type={ButtonType.SUBMIT} isPrimary>
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
