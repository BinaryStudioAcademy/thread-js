import { Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useDispatch, useSelector } from 'hooks/hooks';
import { StorageKey, AppRoute } from 'common/enums/enums';
import { storage } from 'services/services';
import { profileActionCreator, threadActionCreator } from 'store/actions';
import {
  Spinner,
  Header,
  PrivateRoute,
  PublicRoute,
  Notifications
} from 'components/common/common';
import { Sign } from 'components/sign/sign';
import { NotFound } from 'components/not-found/not-found';
import { Profile } from 'components/profile/profile';
import { SharedPost } from 'components/shared-post/shared-post';
import { Thread } from 'components/thread/thread';

const App = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));
  const dispatch = useDispatch();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  const handlePostApply = useCallback(id => (
    dispatch(threadActionCreator.applyPost(id))
  ), [dispatch]);

  const handleUserLogout = useCallback(() => (
    dispatch(profileActionCreator.logout())
  ), [dispatch]);

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
          <Route path={AppRoute.LOGIN} element={<PublicRoute component={Sign} />} />
          <Route path={AppRoute.REGISTRATION} element={<PublicRoute component={Sign} />} />
          <Route path={AppRoute.ROOT} element={<PrivateRoute component={Thread} />} />
          <Route path={AppRoute.PROFILE} element={<PrivateRoute component={Profile} />} />
          <Route path={AppRoute.SHARE_$POSTHASH} element={<PrivateRoute component={SharedPost} />} />
          <Route path={AppRoute.ANY} element={<NotFound />} />
        </Routes>
      </main>
      <Notifications onPostApply={handlePostApply} user={user} />
    </div>
  );
};

export { App };
