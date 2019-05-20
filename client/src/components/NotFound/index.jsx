import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => (
    <div>
        {'Page not found.'}
        {'Go to '}
        <NavLink to="/">Home</NavLink>
        {' page'}
    </div>
);

export default NotFound;
