import PropTypes from 'prop-types';

const commentType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  user: PropTypes.exact({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.exact({
      id: PropTypes.string,
      link: PropTypes.string
    }).isRequired
  }).isRequired
});

export { commentType };
