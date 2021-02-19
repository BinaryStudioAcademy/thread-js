import PropTypes from 'prop-types';

const routeMatchType = PropTypes.shape({
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.exact({
    postHash: PropTypes.string
  }),
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
});

export { routeMatchType };
