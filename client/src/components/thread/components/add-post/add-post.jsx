import { useCallback, useState, useAppForm } from 'hooks/hooks';
import PropTypes from 'prop-types';
import { ButtonColor, ButtonType, IconName, PostPayloadKey } from 'common/enums/enums';
import { Button, Image, FormTextarea, Segment } from 'components/common/common';
import { DEFAULT_ADD_POST_PAYLOAD } from './common/constants';

import styles from './styles.module.scss';

const AddPost = ({ onPostAdd, uploadImage }) => {
  const [image, setImage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_ADD_POST_PAYLOAD
  });

  const handleAddPost = useCallback(
    values => {
      if (!values.body) {
        return;
      }
      onPostAdd({ imageId: image?.imageId, body: values.body }).then(() => {
        reset();
        setImage(undefined);
      });
    },
    [image, reset, onPostAdd]
  );

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
      <form onSubmit={handleSubmit(handleAddPost)}>
        <FormTextarea
          name={PostPayloadKey.BODY}
          placeholder="What is the news?"
          control={control}
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
