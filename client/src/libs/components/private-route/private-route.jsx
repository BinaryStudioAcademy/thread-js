import { AppRoute } from 'libs/enums/enums';
import { useSelector } from 'libs/hooks/hooks';
import { locationType } from 'libs/prop-types/property-types';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

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
