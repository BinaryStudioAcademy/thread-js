import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { locationType } from 'src/common/prop-types/prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthorized } = useSelector(state => ({
    isAuthorized: state.profile.isAuthorized
  }));

  return (
    <Route
      {...rest}
      render={props => (isAuthorized ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: locationType
};

PrivateRoute.defaultProps = {
  location: undefined
};

export default PrivateRoute;
