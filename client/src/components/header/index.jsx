import React from 'react';
import { logout } from 'src/components/profile/logic/profileActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import styles from './header.module.scss';

const Header = (props) => {
    const { token } = props;
    const isAuthorized = token;
    return (
        <div className={styles.root}>
            <div className={styles.title}>Thread.JS</div>
            {isAuthorized && (
                <div>
                    <NavLink exact activeClassName={styles.active} to="/profile">Profile</NavLink>
                    <NavLink exact activeClassName={styles.active} to="/">Home</NavLink>
                    <button type="button" onClick={props.logout}>Logout</button>
                </div>
            )}
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    logout: PropTypes.func.isRequired
};

Header.defaultProps = {
    token: undefined
};

const actions = {
    logout
};

const mapStateToProps = rootState => ({
    token: rootState.profile.token
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));
