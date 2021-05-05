import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { locationType } from 'src/common/prop-types/prop-types';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthorized } = useSelector(state => ({
    isAuthorized: state.profile.isAuthorized
  }));

  return (
    <Route
      {...rest}
      render={props => (isAuthorized ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      ))}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: locationType
};

PublicRoute.defaultProps = {
  location: undefined
};

export default PublicRoute;
