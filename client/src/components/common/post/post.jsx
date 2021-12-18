import PropTypes from 'prop-types';
import { getFromNowTime } from 'helpers/helpers';
import { IconName } from 'common/enums/enums';
import { postType } from 'common/prop-types/prop-types';
import { Icon, IconButton, Card, Image } from 'components/common/common';

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
        <IconButton
          icon={<Icon name={IconName.THUMBS_UP} />}
          label={likeCount}
          onClick={handlePostLike}
        />
        <IconButton
          icon={<Icon name={IconName.THUMBS_DOWN} />}
          label={dislikeCount}
          onClick={() => {}}
        />
        <IconButton
          icon={<Icon name={IconName.COMMENT} />}
          label={commentCount}
          onClick={handleExpandedPostToggle}
        />
        <IconButton
          icon={<Icon name={IconName.SHARE_ALTERNATE} />}
          onClick={() => sharePost(id)}
        />
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
