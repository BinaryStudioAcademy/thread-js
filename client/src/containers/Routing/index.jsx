import React from 'react';
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
import { loadCurrentUser, logout, login, registration } from 'src/containers/Profile/actions';
import { applyPost } from 'src/containers/Thread/actions';
import PropTypes from 'prop-types';

class Routing extends React.Component {
    componentDidMount() {
        this.props.loadCurrentUser();
    }

    renderLogin = loginProps => (
        <Login
            {...loginProps}
            isAuthorized={this.props.isAuthorized}
            login={this.props.login}
        />
    );

    renderRegistration = regProps => (
        <Registration
            {...regProps}
            isAuthorized={this.props.isAuthorized}
            registration={this.props.registration}
        />
    );

    render() {
        const { isLoading, isAuthorized, user, ...props } = this.props;
        return (
            isLoading
                ? <Spinner />
                : (
                    <div className="fill">
                        {isAuthorized && (
                            <header>
                                <Header user={user} logout={props.logout} />
                            </header>
                        )}
                        <main className="fill">
                            <Switch>
                                <Route exact path="/login" render={this.renderLogin} />
                                <Route exact path="/registration" render={this.renderRegistration} />
                                <PrivateRoute exact path="/" component={Thread} />
                                <PrivateRoute exact path="/profile" component={Profile} />
                                <PrivateRoute path="/share/:postHash" component={SharedPost} />
                                <Route path="*" exact component={NotFound} />
                            </Switch>
                        </main>
                        <Notifications applyPost={this.props.applyPost} user={user} />
                    </div>
                )
        );
    }
}

Routing.propTypes = {
    isAuthorized: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    registration: PropTypes.func.isRequired,
    applyPost: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.any),
    isLoading: PropTypes.bool,
    loadCurrentUser: PropTypes.func.isRequired,
    userId: PropTypes.string,
};

Routing.defaultProps = {
    isAuthorized: false,
    user: {},
    isLoading: true,
    userId: undefined
};

const actions = { loadCurrentUser, login, logout, registration, applyPost };

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
)(Routing);
