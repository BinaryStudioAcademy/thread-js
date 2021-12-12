import { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonType } from 'common/enums/enums';
import { Button, Form } from 'components/common/common';

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
    <Form reply onSubmit={handleAddComment}>
      <Form.TextArea
        value={body}
        placeholder="Type a comment..."
        onChange={ev => setBody(ev.target.value)}
      />
      <Button type={ButtonType.SUBMIT} isPrimary>
        Post comment
      </Button>
    </Form>
  );
};

AddComment.propTypes = {
  onCommentAdd: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired
};

export default AddComment;
