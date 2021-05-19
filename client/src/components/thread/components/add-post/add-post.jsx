import * as React from 'react';
import PropTypes from 'prop-types';
import { ButtonColor, ButtonType, IconName } from 'src/common/enums/enums';
import { Button, Form, Image, Segment } from 'src/components/common/common';

import styles from './styles.module.scss';

const AddPost = ({ onPostAdd, uploadImage }) => {
  const [body, setBody] = React.useState('');
  const [image, setImage] = React.useState(undefined);
  const [isUploading, setIsUploading] = React.useState(false);

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
      })
      .finally(() => {
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
        <div className={styles.btnWrapper}>
          <Button
            color="teal"
            isLoading={isUploading}
            isDisabled={isUploading}
            iconName={IconName.IMAGE}
          >
            <label className={styles.btnImgLabel}>
              Attach image
              <input
                name="image"
                type="file"
                onChange={handleUploadFile}
                hidden
              />
            </label>
          </Button>
          <Button color={ButtonColor.BLUE} type={ButtonType.SUBMIT}>
            Post
          </Button>
        </div>
      </Form>
    </Segment>
  );
};

AddPost.propTypes = {
  onPostAdd: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default AddPost;
