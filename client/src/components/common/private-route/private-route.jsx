import * as React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { AppRoute } from 'src/common/enums/enums';
import { locationType } from 'src/common/prop-types/prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  const hasUser = Boolean(user);

  return hasUser
    ? <Component {...rest} />
    : <Navigate to={{ pathname: AppRoute.LOGIN, state: { from: rest.location } }} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: locationType
};

PrivateRoute.defaultProps = {
  location: undefined
};

export default PrivateRoute;
