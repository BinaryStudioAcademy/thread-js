import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StorageKey, AppRoute } from 'src/common/enums/enums';
import { storage } from 'src/services/services';
import { profileActionCreator, threadActionCreator } from 'src/store/actions';
import {
  Spinner,
  Header,
  PrivateRoute,
  PublicRoute,
  Notifications
} from 'src/components/common/common';
import SignPage from 'src/components/sign/sign';
import NotFoundPage from 'src/components/not-found/not-found';
import ProfilePage from 'src/components/profile/profile';
import SharedPostPage from 'src/components/shared-post/shared-post';
import ThreadPage from 'src/components/thread/thread';

const Routing = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));
  const dispatch = useDispatch();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  const handlePostApply = React.useCallback(id => (
    dispatch(threadActionCreator.applyPost(id))
  ), [dispatch]);

  const handleUserLogout = React.useCallback(() => (
    dispatch(profileActionCreator.logout())
  ), [dispatch]);

  React.useEffect(() => {
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
          <Route path={AppRoute.LOGIN} element={<PublicRoute component={SignPage} />} />
          <Route path={AppRoute.REGISTRATION} element={<PublicRoute component={SignPage} />} />
          <Route path={AppRoute.ROOT} element={<PrivateRoute component={ThreadPage} />} />
          <Route path={AppRoute.PROFILE} element={<PrivateRoute component={ProfilePage} />} />
          <Route path={AppRoute.SHARE_$POSTHASH} element={<PrivateRoute component={SharedPostPage} />} />
          <Route path={AppRoute.ANY} exact element={<NotFoundPage />} />
        </Routes>
      </main>
      <Notifications onPostApply={handlePostApply} user={user} />
    </div>
  );
};

export default Routing;
