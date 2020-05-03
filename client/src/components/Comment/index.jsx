import React from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentUI } from 'semantic-ui-react';
import moment from 'moment';
import { getUserImgLink } from 'src/helpers/imageHelper';

import styles from './styles.module.scss';

const Comment = ({ comment: { body, createdAt, user } }) => (
  <CommentUI className={styles.comment}>
    <CommentUI.Avatar src={getUserImgLink(user.image)} />
    <CommentUI.Content>
      <CommentUI.Author as="a">
        {user.username}
      </CommentUI.Author>
      <CommentUI.Metadata>
        {moment(createdAt).fromNow()}
      </CommentUI.Metadata>
      <CommentUI.Text>
        {body}
      </CommentUI.Text>
    </CommentUI.Content>
  </CommentUI>
);

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Comment;
