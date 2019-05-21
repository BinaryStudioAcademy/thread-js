import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Thread from 'src/containers/Thread';
import Login from 'src/containers/Login';
import Registration from 'src/containers/Registration';
import Profile from 'src/components/Profile';
import Header from 'src/components/Header';
import SharedPost from 'src/components/SharedPost';
import Spinner from 'src/components/common/Spinner';
import NotFound from 'src/scenes/NotFound';
import PrivateRoute from 'src/containers/PrivateRoute';
import Notifications from 'src/components/Notifications';
import { loadCurrentUser, logout } from 'src/components/Profile/logic/profileActions';
import { applyPost } from 'src/containers/Thread/actions';
import PropTypes from 'prop-types';

class Routing extends React.Component {
    componentDidMount() {
        this.props.loadCurrentUser();
    }

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
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/registration" component={Registration} />
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

const actions = { loadCurrentUser, logout, applyPost };

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
