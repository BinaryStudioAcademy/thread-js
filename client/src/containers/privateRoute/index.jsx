/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            localStorage.getItem('token')
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
    location: PropTypes.any,
    component: PropTypes.any
};

PrivateRoute.defaultProps = {
    location: undefined,
    component: undefined
};

export default PrivateRoute;
