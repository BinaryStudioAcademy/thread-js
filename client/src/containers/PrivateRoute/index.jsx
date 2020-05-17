import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthorized
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  />
);

PrivateRoute.propTypes = {
  isAuthorized: PropTypes.bool,
  component: PropTypes.any.isRequired, // eslint-disable-line
  location: PropTypes.any // eslint-disable-line
};

PrivateRoute.defaultProps = {
  isAuthorized: false,
  location: undefined
};

const mapStateToProps = rootState => ({
  isAuthorized: rootState.profile.isAuthorized
});

export default connect(mapStateToProps)(PrivateRoute);
