import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Thread from 'src/components/thread';
import Profile from 'src/components/profile';
import Header from 'src/components/header';
import Login from 'src/components/login';
import Registration from 'src/components/registration';
import PrivateRoute from 'src/containers/privateRoute';
import { setToken, loadCurrentUser } from 'src/components/profile/logic/profileActions';
import PropTypes from 'prop-types';

import styles from './app.module.scss';

const Spinner = () => <div>Loading...</div>;

class App extends React.Component {
    constructor(props) {
        super(props);
        if (!props.token) {
            const lsToken = localStorage.getItem('token');
            props.setToken(lsToken);
        }
    }

    componentDidMount() {
        this.props.loadCurrentUser();
    }

    render() {
        return !this.props.isLoading
            ? (
                <div className={styles['root-app']}>
                    <header>
                        <Header />
                    </header>
                    <main>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/registration" component={Registration} />
                            <PrivateRoute exact path="/" component={Thread} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                        </Switch>
                    </main>
                </div>
            )
            : <Spinner />;
    }
}

App.propTypes = {
    token: PropTypes.string,
    isLoading: PropTypes.bool,
    setToken: PropTypes.func.isRequired,
    loadCurrentUser: PropTypes.func.isRequired
};

App.defaultProps = {
    token: undefined,
    isLoading: true
};

const actions = { setToken, loadCurrentUser };

const mapStateToProps = rootState => ({
    token: rootState.profile.token,
    isLoading: rootState.profile.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
