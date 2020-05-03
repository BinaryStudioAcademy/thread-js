import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Thread from 'src/containers/Thread';
import Login from 'src/components/Login';
import Registration from 'src/components/Registration';
import Profile from 'src/containers/Profile';
import Header from 'src/components/Header';
import SharedPost from 'src/containers/SharedPost';
import Spinner from 'src/components/Spinner';
import NotFound from 'src/scenes/NotFound';
import PrivateRoute from 'src/containers/PrivateRoute';
import Notifications from 'src/components/Notifications';
import {
  loadCurrentUser,
  logout,
  login,
  registration
} from 'src/containers/Profile/actions';
import { applyPost } from 'src/containers/Thread/actions';
import PropTypes from 'prop-types';

const Routing = ({
  user,
  isAuthorized,
  login: signIn,
  registration: signOn,
  applyPost: newPost,
  logout: signOut,
  loadCurrentUser: loadUser,
  isLoading
}) => {
  useEffect(() => {
    if (!isAuthorized) {
      loadUser();
    }
  });

  const renderLogin = loginProps => (
    <Login {...loginProps} isAuthorized={isAuthorized} login={signIn} />
  );

  const renderRegistration = regProps => (
    <Registration {...regProps} isAuthorized={isAuthorized} registration={signOn} />
  );

  return (
    isLoading
      ? <Spinner />
      : (
        <div className="fill">
          {isAuthorized && (
            <header>
              <Header user={user} logout={signOut} />
            </header>
          )}
          <main className="fill">
            <Switch>
              <Route exact path="/login" render={renderLogin} />
              <Route exact path="/registration" render={renderRegistration} />
              <PrivateRoute exact path="/" component={Thread} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/share/:postHash" component={SharedPost} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </main>
          <Notifications applyPost={newPost} user={user} />
        </div>
      )
  );
};

Routing.propTypes = {
  isAuthorized: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  registration: PropTypes.func.isRequired,
  applyPost: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
  loadCurrentUser: PropTypes.func.isRequired
};

Routing.defaultProps = {
  isAuthorized: false,
  user: {},
  isLoading: true
};

const actions = { loadCurrentUser, login, logout, registration, applyPost };

const mapStateToProps = ({ profile }) => ({
  isAuthorized: profile.isAuthorized,
  user: profile.user,
  isLoading: profile.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing);
