import PropTypes from 'prop-types';
import { imageType } from 'src/common/prop-types/image';
import { commentType } from 'src/common/prop-types/comment';

const postType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  image: imageType,
  imageId: PropTypes.string,
  likeCount: PropTypes.string.isRequired,
  dislikeCount: PropTypes.string.isRequired,
  commentCount: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(commentType),
  userId: PropTypes.string.isRequired,
  user: PropTypes.exact({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image: imageType
  }).isRequired
});

export { postType };
