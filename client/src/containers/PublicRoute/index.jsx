import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PublicRoute = ({ isAuthorized, location, ...props }) => (
  isAuthorized
    ? <Redirect to={{ pathname: '/', state: { from: location } }} />
    : <Route {...props} render={({ Component, ...rest }) => <Component {...rest} />} />
);

PublicRoute.propTypes = {
  isAuthorized: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.any
};

PublicRoute.defaultProps = {
  isAuthorized: false,
  location: undefined
};

const mapStateToProps = rootState => ({
  isAuthorized: rootState.profile.isAuthorized,
  isLoading: rootState.profile.isLoading
});

export default connect(mapStateToProps)(PublicRoute);
