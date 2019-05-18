import React from 'react';
import { logout } from 'src/components/profile/logic/profileActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Header as HeaderUI, Image, Grid, Icon, Button } from 'semantic-ui-react';

import styles from './styles';

const Header = ({ isAuthorized, user, ...props }) => isAuthorized && (
    <div style={styles.headerWrp}>
        <Grid centered container columns="2">
            <Grid.Column>
                <NavLink exact to="/profile">
                    <HeaderUI>
                        <Image circular src={user.image && user.image.link} />
                        {' '}
                        Patrick
                    </HeaderUI>
                </NavLink>
            </Grid.Column>
            <Grid.Column textAlign="right">
                <NavLink exact activeClassName="active" to="/">
                    <Icon name="home" size="large" />
                </NavLink>
                <Button basic icon type="button" style={styles.logoutBtn} onClick={props.logout}>
                    <Icon name="log out" size="large" />
                </Button>
            </Grid.Column>
        </Grid>
    </div>
);

Header.propTypes = {
    isAuthorized: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.any)
};

Header.defaultProps = {
    isAuthorized: false,
    user: {}
};

const actions = {
    logout
};

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized,
    user: rootState.profile.user
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
