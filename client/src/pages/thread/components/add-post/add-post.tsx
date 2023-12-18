import { type AsyncThunkAction } from '@reduxjs/toolkit';

import { Button, Image, Input, Segment } from '~/libs/components/components.js';
import { ButtonColor, IconName } from '~/libs/enums/enums.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type Image as TImage } from '~/packages/image/image.js';
import {
  type CreatePostRequestDto,
  type GetPostByIdResponseDto
} from '~/packages/post/post.js';
import { PostPayloadKey } from '~/packages/post/post.js';

import { DEFAULT_ADD_POST_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onPostAdd: (
    payload: CreatePostRequestDto
  ) => ReturnType<
    AsyncThunkAction<
      Record<'post', GetPostByIdResponseDto> | AsyncThunkConfig,
      unknown,
      AsyncThunkConfig
    >
  >;
  onUploadImage: (payload: File) => Promise<TImage>;
};

const AddPost: React.FC<Properties> = ({ onPostAdd, onUploadImage }) => {
  const [image, setImage] = useState<Pick<TImage, 'id' | 'link'> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_ADD_POST_PAYLOAD
  });

  const handleAddPost = useCallback(
    (values: Omit<CreatePostRequestDto, 'imageId'>) => {
      if (!values.body) {
        return;
      }
      void onPostAdd({ imageId: image?.id ?? null, body: values.body })
        .unwrap()
        .then(() => {
          reset();
          setImage(null);
        });
    },
    [image, reset, onPostAdd]
  );

  const handleUploadFile = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setIsUploading(true);
      const [file] = target.files ?? [];

      onUploadImage(file as File)
        .then(({ id, link }) => {
          setImage({ id, link });
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
        {Boolean(image) && (
          <div className={styles['imageWrapper']}>
            <Image
              className={styles['image'] as string}
              src={(image as TImage).link as string}
              alt="post image"
            />
          </div>
        )}
        <div className={styles['btnWrapper']}>
          <Button
            color="teal"
            isLoading={isUploading}
            isDisabled={isUploading}
            iconName={IconName.IMAGE}
          >
            <label className={styles['btnImgLabel']}>
              Attach image
              <input
                name="image"
                type="file"
                onChange={handleUploadFile}
                hidden
              />
            </label>
          </Button>
          <Button color={ButtonColor.BLUE} type="submit">
            Post
          </Button>
        </div>
      </form>
    </Segment>
  );
};

export { AddPost };
