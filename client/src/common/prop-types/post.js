import PropTypes from 'prop-types';
import { imageType } from 'common/prop-types/image';
import { commentType } from 'common/prop-types/comment';

const postType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  image: imageType,
  imageId: PropTypes.number,
  likeCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dislikeCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  commentCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  comments: PropTypes.arrayOf(commentType),
  userId: PropTypes.number.isRequired,
  user: PropTypes.exact({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    imageId: PropTypes.number,
    image: imageType
  }).isRequired
});

export { postType };
