import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import { locationType } from 'common/prop-types/prop-types';

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

export { PrivateRoute };
