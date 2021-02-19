import PropTypes from 'prop-types';

const locationType = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  key: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired
});

export { locationType };
