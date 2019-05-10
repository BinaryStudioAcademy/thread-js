/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
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
    location: PropTypes.any,
    Component: PropTypes.any
};

PrivateRoute.defaultProps = {
    isAuthorized: false,
    location: undefined,
    Component: undefined
};

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized,
    isLoading: rootState.profile.isLoading
});

export default connect(mapStateToProps)(PrivateRoute);
