import { getFromNowTime } from 'helpers/helpers';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { Comment as CommentUI } from 'components/common/common';
import { commentType } from 'common/prop-types/prop-types';

import styles from './styles.module.scss';

const Comment = ({ comment: { body, createdAt, user } }) => (
  <CommentUI className={styles.comment}>
    <CommentUI.Avatar src={user.image?.link ?? DEFAULT_USER_AVATAR} />
    <CommentUI.Content>
      <CommentUI.Author as="a">{user.username}</CommentUI.Author>
      <CommentUI.Metadata>{getFromNowTime(createdAt)}</CommentUI.Metadata>
      <CommentUI.Text>{body}</CommentUI.Text>
    </CommentUI.Content>
  </CommentUI>
);

Comment.propTypes = {
  comment: commentType.isRequired
};

export default Comment;
