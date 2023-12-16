import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type Location } from '~/libs/types/types.js';

type PrivateRouteProperties = {
  component: React.ComponentType<{ location?: Location }>;
  location?: Location;
};

const PrivateRoute: React.FC<PrivateRouteProperties> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAppSelector(state => ({
    user: state.profile.user
  }));

  const hasUser = Boolean(user);

  return hasUser ? (
    <Component {...rest} />
  ) : (
    <Navigate
      to={{ pathname: AppRoute.LOGIN }}
      state={{ from: rest.location }}
    />
  );
};

export { PrivateRoute };
