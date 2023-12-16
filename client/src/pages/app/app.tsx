import { Route, Routes } from 'react-router-dom';

import { Header } from '~/libs/components/header/header.js';
import { Notifications } from '~/libs/components/notifications/notifications.js';
import { PrivateRoute } from '~/libs/components/private-route/private-route.js';
import { PublicRoute } from '~/libs/components/public-route/public-route.js';
import { Spinner } from '~/libs/components/spinner/spinner.js';
import { AppRoute, StorageKey } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect
} from '~/libs/hooks/hooks.js';
import { storageApi } from '~/packages/storage/storage.js';
import { type UserWithImageRelation } from '~/packages/user/user.js';
import { NotFound } from '~/pages/not-found/not-found.js';
import { Profile } from '~/pages/profile/profile.js';
import { SharedPost } from '~/pages/shared-post/shared-post.js';
import { Sign } from '~/pages/sign/sign.js';
import { Thread } from '~/pages/thread/thread.js';
import { actions as profileActionCreator } from '~/slices/profile/profile.js';

const App: React.FC = () => {
  const { user } = useAppSelector(state => ({
    user: state.profile.user
  }));
  const dispatch = useAppDispatch();

  const hasToken = Boolean(storageApi.get(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  const handleUserLogout = useCallback(
    () => dispatch(profileActionCreator.logout()),
    [dispatch]
  );

  useEffect(() => {
    if (hasToken) {
      void dispatch(profileActionCreator.loadCurrentUser());
    }
  }, [hasToken, dispatch]);

  if (!hasUser && hasToken) {
    return <Spinner isOverflow />;
  }

  return (
    <div className="fill">
      {hasUser && (
        <header>
          <Header
            user={user as UserWithImageRelation}
            onUserLogout={handleUserLogout}
          />
        </header>
      )}
      <main className="fill">
        <Routes>
          <Route
            path={AppRoute.LOGIN}
            element={<PublicRoute component={Sign} />}
          />
          <Route
            path={AppRoute.REGISTRATION}
            element={<PublicRoute component={Sign} />}
          />
          <Route
            path={AppRoute.ROOT}
            element={<PrivateRoute component={Thread} />}
          />
          <Route
            path={AppRoute.PROFILE}
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path={AppRoute.SHARE_$POSTHASH}
            element={<PrivateRoute component={SharedPost} />}
          />
          <Route path={AppRoute.ANY} element={<NotFound />} />
        </Routes>
      </main>
      <Notifications user={user} />
    </div>
  );
};

export { App };
