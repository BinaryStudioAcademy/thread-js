import PropTypes from 'prop-types';

const userType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageId: PropTypes.string,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
});

export { userType };
