import PropTypes from 'prop-types';

const imageType = PropTypes.exact({
  id: PropTypes.number,
  link: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
});

export { imageType };
