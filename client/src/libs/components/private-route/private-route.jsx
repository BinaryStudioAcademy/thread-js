import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'libs/hooks/hooks';
import { AppRoute } from 'libs/enums/enums.js';
import { locationType } from 'libs/prop-types/prop-types';

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
