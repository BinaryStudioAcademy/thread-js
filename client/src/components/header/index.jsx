import React from 'react';
import { logout } from 'src/components/profile/logic/profileActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';

const Header = props => (
    <div className={styles.root}>
        <div className={styles.title}>Thread.JS</div>
        {props.isAuthorized && (
            <div>
                <NavLink exact activeClassName={styles.active} to="/profile">Profile</NavLink>
                <NavLink exact activeClassName={styles.active} to="/">Home</NavLink>
                <button type="button" onClick={props.logout}>Logout</button>
            </div>
        )}
    </div>
);

Header.propTypes = {
    isAuthorized: PropTypes.bool,
    logout: PropTypes.func.isRequired
};

Header.defaultProps = {
    isAuthorized: false
};

const actions = {
    logout
};

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
