import React from 'react';
import { logout } from 'src/components/profile/logic/profileActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import styles from './header.module.scss';

const Header = (props) => {
    const { user } = props;
    const isAuthorized = user && user.id;
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
    user: PropTypes.objectOf(PropTypes.any),
    logout: PropTypes.func.isRequired
};

Header.defaultProps = {
    user: undefined
};

const actions = {
    logout
};

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));
