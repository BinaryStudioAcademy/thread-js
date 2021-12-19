import { useState } from 'react';
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

  return (
    <form name="comment" onSubmit={handleAddComment}>
      <TextArea
        className={styles.commentArea}
        value={body}
        placeholder="Type a comment..."
        onChange={ev => setBody(ev.target.value)}
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
