/* eslint-disable react/jsx-no-bind */
import { IconName } from '~/libs/enums/enums.js';
import { getFromNowTime } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import { IconButton } from '../icon-button/icon-button.js';
import { Image } from '../image/image.js';
import styles from './styles.module.scss';
import { Post as PostType } from '~/libs/types/types.js';

type PostProps = {
  post: PostType;
  onPostLike: Function;
  onExpandedPostToggle: Function;
  onSharePost: Function;
};

const Post: React.FC<PostProps> = ({ post, onPostLike, onExpandedPostToggle, onSharePost }) => {
  const {
    id,
    image,
    body,
    user,
    likeCount,
    dislikeCount,
    commentCount,
    createdAt
  } = post;
  const date = getFromNowTime(createdAt);

  const handlePostLike = useCallback(() => onPostLike(id), [id, onPostLike]);
  const handleExpandedPostToggle = useCallback(
    () => onExpandedPostToggle(id),
    [id, onExpandedPostToggle]
  );
  const handleSharePost = useCallback(() => onSharePost(id), [id, onSharePost]);

  return (
    <div className={styles.card}>
      {image && <Image src={image.link} alt="post image" />}
      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{`posted by ${user.username} - ${date}`}</span>
        </div>
        <p className={styles.description}>{body}</p>
      </div>
      <div className={styles.extra}>
        <IconButton
          iconName={IconName.THUMBS_UP}
          label={likeCount}
          onClick={handlePostLike}
        />
        <IconButton
          iconName={IconName.THUMBS_DOWN}
          label={dislikeCount}
          onClick={() => {}}
        />
        <IconButton
          iconName={IconName.COMMENT}
          label={commentCount}
          onClick={handleExpandedPostToggle}
        />
        <IconButton
          iconName={IconName.SHARE_ALTERNATE}
          onClick={handleSharePost}
        />
      </div>
    </div>
  );
};

export { Post };
