/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            rest.isAuthorized
                ? <Component {...props} />
                : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                    />
                )
        )}
    />
);

PrivateRoute.propTypes = {
    isAuthorized: PropTypes.bool,
    location: PropTypes.any,
    component: PropTypes.any
};

PrivateRoute.defaultProps = {
    isAuthorized: undefined,
    location: undefined,
    component: undefined
};

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized
});

export default connect(mapStateToProps)(PrivateRoute);
