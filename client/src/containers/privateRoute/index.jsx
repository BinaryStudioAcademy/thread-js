import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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
    location: Location,
    component: React.Component
};

PrivateRoute.defaultProps = {
    location: undefined,
    component: undefined
};

export default PrivateRoute;
