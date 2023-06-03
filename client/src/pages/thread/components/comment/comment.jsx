import { getFromNowTime } from '~/libs/helpers/helpers.js';
import { DEFAULT_USER_AVATAR } from '~/packages/user/constants/constants.js';
import { commentType } from '~/libs/prop-types/prop-types.js';

import styles from './styles.module.scss';

const Comment = ({ comment: { body, createdAt, user } }) => (
  <div className={styles.comment}>
    <div>
      <img
        className={styles.avatar}
        src={user.image?.link ?? DEFAULT_USER_AVATAR}
        alt="avatar"
      />
    </div>
    <div>
      <div>
        <span className={styles.author}>{user.username}</span>
        <span className={styles.date}>{getFromNowTime(createdAt)}</span>
      </div>
      <p>{body}</p>
    </div>
  </div>
);

Comment.propTypes = {
  comment: commentType.isRequired
};

export { Comment };
