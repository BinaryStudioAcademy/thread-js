import React, { useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Header, Notifications } from 'src/components/common/common';
import LoginPage from 'src/components/login/login';
import RegistrationPage from 'src/components/registration/registration';
import NotFoundPage from 'src/components/not-found/not-found';
import ProfilePage from 'src/components/profile/profile';
import SharedPostPage from 'src/components/shared-post/shared-post';
import Thread from 'src/containers/Thread';
import PrivateRoute from 'src/containers/PrivateRoute';
import PublicRoute from 'src/containers/PublicRoute';
import { profileActionCreator, threadActionCreator } from 'src/store/actions';

const Routing = () => {
  const { user, isAuthorized, isLoading } = useSelector(state => ({
    isAuthorized: state.profile.isAuthorized,
    user: state.profile.user,
    isLoading: state.profile.isLoading
  }));
  const dispatch = useDispatch();

  const handlePostApply = useCallback(id => {
    dispatch(threadActionCreator.applyPost(id));
  },
  [dispatch]);

  const handleUserLogout = useCallback(() => {
    dispatch(profileActionCreator.logout());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(profileActionCreator.loadCurrentUser());
    }
  }, [isAuthorized, dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="fill">
      {isAuthorized && (
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
          <PrivateRoute exact path="/" component={Thread} />
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
