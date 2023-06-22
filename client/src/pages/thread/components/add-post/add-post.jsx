import PropTypes from 'prop-types';

import { Button } from '~/libs/components/button/button.jsx';
import { Image } from '~/libs/components/image/image.jsx';
import { Input } from '~/libs/components/input/input.jsx';
import { Segment } from '~/libs/components/segment/segment.jsx';
import { ButtonColor, ButtonType, IconName } from '~/libs/enums/enums.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import { PostPayloadKey } from '~/packages/post/libs/enums/enums.js';

import { DEFAULT_ADD_POST_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.scss';

const AddPost = ({ onPostAdd, onUploadImage }) => {
  const [image, setImage] = useState();
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
        setImage();
      });
    },
    [image, reset, onPostAdd]
  );

  const handleUploadFile = useCallback(
    ({ target }) => {
      setIsUploading(true);
      const [file] = target.files;

      onUploadImage(file)
        .then(({ id: imageId, link: imageLink }) => {
          setImage({ imageId, imageLink });
        })
        .catch(() => {
          // TODO: show error
        })
        .finally(() => {
          setIsUploading(false);
        });
    },
    [onUploadImage]
  );

  return (
    <Segment>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <Input
          name={PostPayloadKey.BODY}
          placeholder="What is the news?"
          rows={5}
          control={control}
        />
        {image?.imageLink && (
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={image?.imageLink}
              alt="post image"
            />
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
  onUploadImage: PropTypes.func.isRequired
};

export { AddPost };
