import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useSelector } from '~/libs/hooks/hooks.js';
import { type Location } from '~/libs/types/types.js';

type PrivateRouteProps = {
  component: React.ComponentType<{ location?: Location }>;
  location?: Location;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
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

export { PrivateRoute };
