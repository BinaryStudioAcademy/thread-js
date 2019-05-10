/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            rest.user && rest.user.id
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
    user: PropTypes.objectOf(PropTypes.any),
    location: PropTypes.any,
    component: PropTypes.any
};

PrivateRoute.defaultProps = {
    user: undefined,
    location: undefined,
    component: undefined
};

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});

export default connect(mapStateToProps)(PrivateRoute);
