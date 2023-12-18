import { getFromNowTime } from '~/libs/helpers/helpers.js';
import { type CommentWithUserNestedRelations } from '~/packages/comment/comment.js';
import { DEFAULT_USER_AVATAR } from '~/packages/user/user.js';

import styles from './styles.module.scss';

type Properties = {
  comment: CommentWithUserNestedRelations;
};

const Comment: React.FC<Properties> = ({
  comment: { body, createdAt, user }
}) => (
  <div className={styles['comment']}>
    <div>
      <img
        className={styles['avatar']}
        src={user.image?.link ?? DEFAULT_USER_AVATAR}
        alt="avatar"
      />
    </div>
    <div>
      <div>
        <span className={styles['author']}>{user.username}</span>
        <span className={styles['date']}>{getFromNowTime(createdAt)}</span>
      </div>
      <p>{body}</p>
    </div>
  </div>
);

export { Comment };
