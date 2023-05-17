import { Route, Routes } from 'react-router-dom';
import {
  useCallback,
  useEffect,
  useDispatch,
  useSelector
} from 'libs/hooks/hooks';
import { StorageKey, AppRoute } from 'libs/enums/enums';
import { storage } from 'packages/storage/storage';
import { profileActionCreator } from 'packages/store/actions';
import { Spinner } from 'libs/components/spinner/spinner.jsx';
import { Header } from 'libs/components/header/header.jsx';
import { PrivateRoute } from 'libs/components/private-route/private-route.jsx';
import { PublicRoute } from 'libs/components/public-route/public-route.jsx';
import { Notifications } from 'libs/components/notifications/notifications.jsx';
import { Sign } from 'pages/sign/sign.jsx';
import { NotFound } from 'pages/not-found/not-found.jsx';
import { Profile } from 'pages/profile/profile.jsx';
import { SharedPost } from 'pages/shared-post/shared-post.jsx';
import { Thread } from 'pages/thread/thread.jsx';

const App = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));
  const dispatch = useDispatch();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  const handleUserLogout = useCallback(
    () => dispatch(profileActionCreator.logout()),
    [dispatch]
  );

  useEffect(() => {
    if (hasToken) {
      dispatch(profileActionCreator.loadCurrentUser());
    }
  }, [hasToken, dispatch]);

  if (!hasUser && hasToken) {
    return <Spinner isOverflow />;
  }

  return (
    <div className="fill">
      {hasUser && (
        <header>
          <Header user={user} onUserLogout={handleUserLogout} />
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
