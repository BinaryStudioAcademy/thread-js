import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ButtonType } from 'common/enums/enums';
import { Button, TextArea } from 'components/common/common';

import styles from './styles.module.scss';

const AddComment = ({ postId, onCommentAdd }) => {
  const [body, setBody] = useState('');

  const handleAddComment = async () => {
    if (!body) {
      return;
    }
    await onCommentAdd({ postId, body });
    setBody('');
  };

  const handleTextChange = useCallback(
    ev => setBody(ev.target.value),
    [setBody]
  );

  return (
    <>
      <TextArea
        className={styles.commentArea}
        value={body}
        placeholder="Type a comment..."
        onChange={handleTextChange}
      />
      <Button type={ButtonType.BUTTON} onClick={handleAddComment} isPrimary>
        Post comment
      </Button>
    </>
  );
};

AddComment.propTypes = {
  onCommentAdd: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired
};

export default AddComment;
