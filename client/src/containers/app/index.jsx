import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Thread from 'src/components/thread';
import Profile from 'src/components/profile';
import Header from 'src/components/header';
import Login from 'src/components/login';
import Registration from 'src/components/registration';
import SharedPost from 'src/components/sharedPost/index';
import Spinner from 'src/components/common/spinner';
import GenericNotFound from 'src/components/genericNotFound';

import PrivateRoute from 'src/containers/privateRoute';
import { loadCurrentUser } from 'src/components/profile/logic/profileActions';
import PropTypes from 'prop-types';

import styles from './app.module.scss';

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
        const { isLoading } = this.props;
        return (
            <div className={styles['root-app']}>
                <header>
                    <Header />
                </header>
                {!isLoading
                    ? (
                        <main>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/registration" component={Registration} />
                                <PrivateRoute exact path="/" component={Thread} />
                                <PrivateRoute exact path="/profile" component={Profile} />
                                <PrivateRoute path="/share/:postHash" component={SharedPost} />
                                <Route path="*" exact component={GenericNotFound} />
                            </Switch>
                        </main>
                    )
                    : <Spinner />
                }
            </div>
        );
    }
}

App.propTypes = {
    isLoading: PropTypes.bool,
    loadCurrentUser: PropTypes.func.isRequired,
    userId: PropTypes.string,
};

App.defaultProps = {
    isLoading: true,
    userId: undefined
};

const actions = { loadCurrentUser };

const mapStateToProps = rootState => ({
    isLoading: rootState.profile.isLoading,
    userId: rootState.profile.user && rootState.profile.user.id
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
