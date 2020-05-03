import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

const AddComment = ({
  postId,
  addComment
}) => {
  const [body, setBody] = useState('');

  const handleAddComment = async () => {
    if (!body) {
      return;
    }
    await addComment({ postId, body });
    setBody('');
  };

  return (
    <Form reply onSubmit={handleAddComment}>
      <Form.TextArea
        value={body}
        placeholder="Type a comment..."
        onChange={ev => setBody(ev.target.value)}
      />
      <Button type="submit" content="Post comment" labelPosition="left" icon="edit" primary />
    </Form>
  );
};

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default AddComment;
