import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useSelector } from '~/libs/hooks/hooks.js';

type PublicRouteProps = {
  component: React.ComponentType<{ location?: Location}>;
  location?: Location;
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  const hasUser = Boolean(user);

  return hasUser ? (
    <Navigate
      to={{ pathname: AppRoute.ROOT, state: { from: rest.location } }}
    />
  ) : (
    <Component {...rest} />
  );
};

export { PublicRoute };
