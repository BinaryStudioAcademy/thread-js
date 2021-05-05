import React, { useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Thread from 'src/containers/Thread';
import LoginPage from 'src/containers/LoginPage';
import RegistrationPage from 'src/containers/RegistrationPage';
import Profile from 'src/containers/Profile';
import Header from 'src/components/Header';
import SharedPost from 'src/containers/SharedPost';
import Spinner from 'src/components/Spinner';
import NotFound from 'src/scenes/NotFound';
import PrivateRoute from 'src/containers/PrivateRoute';
import PublicRoute from 'src/containers/PublicRoute';
import Notifications from 'src/components/Notifications';
import { profileActionCreator } from 'src/store/actions';
import { applyPost } from 'src/containers/Thread/actions';

const Routing = () => {
  const { user, isAuthorized, isLoading } = useSelector(state => ({
    isAuthorized: state.profile.isAuthorized,
    user: state.profile.user,
    isLoading: state.profile.isLoading
  }));
  const dispatch = useDispatch();

  const handlePostApply = useCallback(id => {
    dispatch(applyPost(id));
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
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute path="/share/:postHash" component={SharedPost} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </main>
      <Notifications onPostApply={handlePostApply} user={user} />
    </div>
  );
};

export default Routing;
