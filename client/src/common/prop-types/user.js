import PropTypes from 'prop-types';
import { imageType } from 'common/prop-types/image';

const userType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  image: imageType,
  imageId: PropTypes.number,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
});

export { userType };
