import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getUserImgLink } from 'src/helpers/imageHelper';
import { Header as HeaderUI, Image, Grid, Icon, Button } from 'semantic-ui-react';

import styles from './styles.module.scss';

const Header = ({ user, logout }) => (
  <div className={styles.headerWrp}>
    <Grid centered container columns="2">
      <Grid.Column>
        {user && (
          <NavLink exact to="/">
            <HeaderUI>
              <Image circular src={getUserImgLink(user.image)} />
              {' '}
              {user.username}
            </HeaderUI>
          </NavLink>
        )}
      </Grid.Column>
      <Grid.Column textAlign="right">
        <NavLink exact activeClassName="active" to="/profile" className={styles.menuBtn}>
          <Icon name="user circle" size="large" />
        </NavLink>
        <Button basic icon type="button" className={`${styles.menuBtn} ${styles.logoutBtn}`} onClick={logout}>
          <Icon name="log out" size="large" />
        </Button>
      </Grid.Column>
    </Grid>
  </div>
);

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Header;
