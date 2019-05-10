/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadCurrentUser } from 'src/components/profile/logic/profileActions';

class PrivateRoute extends React.Component {

    componentDidMount() {
        this.loadUser();
    }

    componentDidUpdate() {
        this.loadUser();
    }

    loadUser = () => {
        const { isLoading, isAuthorized } = this.props;
        if (!isLoading && !isAuthorized) {
            this.props.loadCurrentUser();
        }
    }

    renderComponent = (props) => {
        const { Component, ...rest } = props;
        return <Component {...rest} />;
    }

    render() {
        const {
            Component,
            isAuthorized,
            location,
            ...rest
        } = this.props;
        return isAuthorized
            ? <Route {...rest} render={this.renderComponent} />
            : <Redirect to={{ pathname: '/login', state: { from: location } }} />;
    }
}

PrivateRoute.propTypes = {
    isAuthorized: PropTypes.bool,
    isLoading: PropTypes.bool,
    location: PropTypes.any,
    Component: PropTypes.any,
    loadCurrentUser: PropTypes.func.isRequired
};

PrivateRoute.defaultProps = {
    isAuthorized: false,
    isLoading: false,
    location: undefined,
    Component: undefined
};

const actions = { loadCurrentUser };

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized,
    isLoading: rootState.profile.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
