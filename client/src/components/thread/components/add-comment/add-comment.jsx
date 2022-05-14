
import PropTypes from 'prop-types';
import { useAppForm, useCallback } from 'hooks/hooks';
import { ButtonType, CommentPayloadKey } from 'common/enums/enums';
import { Button, FormTextarea } from 'components/common/common';
import { DEFAULT_ADD_COMMENT_PAYLOAD } from './common/constants';

import styles from './styles.module.scss';

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
      <FormTextarea
        name={CommentPayloadKey.BODY}
        className={styles.commentArea}
        placeholder="Type a comment..."
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

export default AddComment;
