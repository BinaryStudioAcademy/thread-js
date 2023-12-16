import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

type PublicRouteProperties = {
  component: React.ComponentType<{ location?: Location }>;
  location?: Location;
};

const PublicRoute: React.FC<PublicRouteProperties> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAppSelector(state => ({
    user: state.profile.user
  }));

  const hasUser = Boolean(user);

  return hasUser ? (
    <Navigate
      to={{ pathname: AppRoute.ROOT }}
      state={{ from: rest.location }}
    />
  ) : (
    <Component {...rest} />
  );
};

export { PublicRoute };
