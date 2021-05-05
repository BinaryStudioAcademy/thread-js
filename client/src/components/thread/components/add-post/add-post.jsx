import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Image, Segment } from 'semantic-ui-react';

import styles from './styles.module.scss';

const AddPost = ({ onPostAdd, uploadImage }) => {
  const [body, setBody] = useState('');
  const [image, setImage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddPost = async () => {
    if (!body) {
      return;
    }
    await onPostAdd({ imageId: image?.imageId, body });
    setBody('');
    setImage(undefined);
  };

  const handleUploadFile = ({ target }) => {
    setIsUploading(true);
    const [file] = target.files;

    uploadImage(file)
      .then(({ id: imageId, link: imageLink }) => {
        setImage({ imageId, imageLink });
      })
      .catch(() => {
        // TODO: show error
        setIsUploading(false);
      });
  };

  return (
    <Segment>
      <Form onSubmit={handleAddPost}>
        <Form.TextArea
          name="body"
          value={body}
          placeholder="What is the news?"
          onChange={ev => setBody(ev.target.value)}
        />
        {image?.imageLink && (
          <div className={styles.imageWrapper}>
            <Image className={styles.image} src={image?.imageLink} alt="post" />
          </div>
        )}
        <Button
          color="teal"
          icon
          labelPosition="left"
          as="label"
          loading={isUploading}
          disabled={isUploading}
        >
          <Icon name="image" />
          Attach image
          <input name="image" type="file" onChange={handleUploadFile} hidden />
        </Button>
        <Button floated="right" color="blue" type="submit">
          Post
        </Button>
      </Form>
    </Segment>
  );
};

AddPost.propTypes = {
  onPostAdd: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default AddPost;
