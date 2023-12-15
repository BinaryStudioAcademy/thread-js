import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useSelector } from '~/libs/hooks/hooks.js';
import { locationType } from '~/libs/prop-types/property-types.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  const hasUser = Boolean(user);

  return hasUser ? (
    <Component {...rest} />
  ) : (
    <Navigate
      to={{ pathname: AppRoute.LOGIN, state: { from: rest.location } }}
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

export { PrivateRoute };
