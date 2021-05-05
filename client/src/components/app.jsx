import React, { useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StorageKey } from 'src/common/enums/enums';
import { storage } from 'src/services/services';
import { profileActionCreator, threadActionCreator } from 'src/store/actions';
import {
  Spinner,
  Header,
  PrivateRoute,
  PublicRoute,
  Notifications
} from 'src/components/common/common';
import LoginPage from 'src/components/login/login';
import RegistrationPage from 'src/components/registration/registration';
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
        <Switch>
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute
            exact
            path="/registration"
            component={RegistrationPage}
          />
          <PrivateRoute exact path="/" component={ThreadPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute path="/share/:postHash" component={SharedPostPage} />
          <Route path="*" exact component={NotFoundPage} />
        </Switch>
      </main>
      <Notifications onPostApply={handlePostApply} user={user} />
    </div>
  );
};

export default Routing;
