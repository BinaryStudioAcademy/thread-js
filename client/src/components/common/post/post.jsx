import * as React from 'react';
import PropTypes from 'prop-types';
import { getFromNowTime } from 'src/helpers/helpers';
import { IconName } from 'src/common/enums/enums';
import { postType } from 'src/common/prop-types/prop-types';
import { Icon, Card, Image, Label } from 'src/components/common/common';

import styles from './styles.module.scss';

const Post = ({ post, onPostLike, onExpandedPostToggle, sharePost }) => {
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

  const handlePostLike = () => onPostLike(id);
  const handleExpandedPostToggle = () => onExpandedPostToggle(id);

  return (
    <Card style={{ width: '100%' }}>
      {image && <Image src={image.link} wrapped ui={false} />}
      <Card.Content>
        <Card.Meta>
          <span className="date">
            posted by
            {' '}
            {user.username}
            {' - '}
            {date}
          </span>
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label
          basic
          size="small"
          as="a"
          className={styles.toolbarBtn}
          onClick={handlePostLike}
        >
          <Icon name={IconName.THUMBS_UP} />
          {likeCount}
        </Label>
        <Label basic size="small" as="a" className={styles.toolbarBtn}>
          <Icon name={IconName.THUMBS_DOWN} />
          {dislikeCount}
        </Label>
        <Label
          basic
          size="small"
          as="a"
          className={styles.toolbarBtn}
          onClick={handleExpandedPostToggle}
        >
          <Icon name={IconName.COMMENT} />
          {commentCount}
        </Label>
        <Label
          basic
          size="small"
          as="a"
          className={styles.toolbarBtn}
          onClick={() => sharePost(id)}
        >
          <Icon name={IconName.SHARE_ALTERNATE} />
        </Label>
      </Card.Content>
    </Card>
  );
};

Post.propTypes = {
  post: postType.isRequired,
  onPostLike: PropTypes.func.isRequired,
  onExpandedPostToggle: PropTypes.func.isRequired,
  sharePost: PropTypes.func.isRequired
};

export default Post;
