import { useCallback, useState } from 'hooks/hooks';
import PropTypes from 'prop-types';
import { ButtonColor, ButtonType, IconName } from 'common/enums/enums';
import { Button, Image, TextArea, Segment } from 'components/common/common';

import styles from './styles.module.scss';

const AddPost = ({ onPostAdd, uploadImage }) => {
  const [body, setBody] = useState('');
  const [image, setImage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddPost = async ev => {
    ev.preventDefault();
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

  const handleTextAreaChange = useCallback(ev => setBody(ev.target.value), [setBody]);
  return (
    <Segment>
      <form onSubmit={handleAddPost}>
        <TextArea
          name="body"
          value={body}
          placeholder="What is the news?"
          onChange={handleTextAreaChange}
        />
        {image?.imageLink && (
          <div className={styles.imageWrapper}>
            <Image className={styles.image} src={image?.imageLink} alt="post image" />
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
      </form>
    </Segment>
  );
};

AddPost.propTypes = {
  onPostAdd: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default AddPost;
