import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Thread from 'src/components/thread';
import Profile from 'src/components/profile';
import Header from 'src/components/Header';
import Login from 'src/components/login';
import Registration from 'src/components/registration';
import SharedPost from 'src/components/sharedPost/index';
import Spinner from 'src/components/common/spinner';
import NotFound from 'src/scenes/NotFound';
import PrivateRoute from 'src/containers/privateRoute';
import { loadCurrentUser, logout } from 'src/components/profile/logic/profileActions';
import PropTypes from 'prop-types';

class App extends React.Component {
    componentDidMount() {
        this.props.loadCurrentUser();
    }

    componentDidUpdate(prevProps) {
        const { userId } = this.props;
        if (userId && userId !== prevProps.userId) {
            const socket = io('http://localhost:3002');
            socket.emit('createRoom', 'userId');
        }
    }

    render() {
        const { isLoading, isAuthorized, user, ...props } = this.props;
        return (
            !isLoading
                ? (
                    <div className="fill">
                        {isAuthorized && (
                            <header>
                                <Header user={user} logout={props.logout} />
                            </header>
                        )}
                        <main className="fill">
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/registration" component={Registration} />
                                <PrivateRoute exact path="/" component={Thread} />
                                <PrivateRoute exact path="/profile" component={Profile} />
                                <PrivateRoute path="/share/:postHash" component={SharedPost} />
                                <Route path="*" exact component={NotFound} />
                            </Switch>
                        </main>
                    </div>
                )
                : <Spinner />
        );
    }
}

App.propTypes = {
    isAuthorized: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.any),
    isLoading: PropTypes.bool,
    loadCurrentUser: PropTypes.func.isRequired,
    userId: PropTypes.string,
};

App.defaultProps = {
    isAuthorized: false,
    user: {},
    isLoading: true,
    userId: undefined
};

const actions = { loadCurrentUser, logout };

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized,
    user: rootState.profile.user,
    isLoading: rootState.profile.isLoading,
    userId: rootState.profile.user && rootState.profile.user.id
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
