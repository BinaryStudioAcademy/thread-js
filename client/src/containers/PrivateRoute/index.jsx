import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { locationType } from 'src/common/propTypes';

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
  component: PropTypes.elementType.isRequired,
  location: locationType
};

PrivateRoute.defaultProps = {
  isAuthorized: false,
  location: undefined
};

const mapStateToProps = rootState => ({
  isAuthorized: rootState.profile.isAuthorized
});

export default connect(mapStateToProps)(PrivateRoute);
