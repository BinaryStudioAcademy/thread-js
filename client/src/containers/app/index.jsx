import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

    render() {
        const { isLoading } = this.props;
        return (
            !isLoading
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
                                <PrivateRoute path="/share/:postHash" component={SharedPost} />
                                <Route path="*" exact component={GenericNotFound} />
                            </Switch>
                        </main>
                    </div>
                )
                : <Spinner />
        );
    }
}

App.propTypes = {
    isLoading: PropTypes.bool,
    loadCurrentUser: PropTypes.func.isRequired
};

App.defaultProps = {
    isLoading: true
};

const actions = { loadCurrentUser };

const mapStateToProps = rootState => ({
    isLoading: rootState.profile.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
