import React from 'react';
import { logout } from 'src/components/profile/logic/profileActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Header = props => (
    <div>
        <div>Thread.JS</div>
        {props.isAuthorized && (
            <div>
                <NavLink exact activeClassName="active" to="/profile">Profile</NavLink>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
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
