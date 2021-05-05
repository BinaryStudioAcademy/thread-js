import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Header as HeaderUI,
  Image,
  Grid,
  Icon,
  Button
} from 'semantic-ui-react';
import { DEFAULT_USER_AVATAR } from 'src/common/constants/constants';
import { userType } from 'src/common/prop-types/prop-types';

import styles from './styles.module.scss';

const Header = ({ user, onUserLogout }) => (
  <div className={styles.headerWrp}>
    <Grid centered container columns="2">
      <Grid.Column>
        {user && (
          <NavLink exact to="/">
            <HeaderUI>
              <Image circular src={user.image?.link ?? DEFAULT_USER_AVATAR} />
              {' '}
              {user.username}
            </HeaderUI>
          </NavLink>
        )}
      </Grid.Column>
      <Grid.Column textAlign="right">
        <NavLink
          exact
          activeClassName="active"
          to="/profile"
          className={styles.menuBtn}
        >
          <Icon name="user circle" size="large" />
        </NavLink>
        <Button
          basic
          icon
          type="button"
          className={`${styles.menuBtn} ${styles.logoutBtn}`}
          onClick={onUserLogout}
        >
          <Icon name="log out" size="large" />
        </Button>
      </Grid.Column>
    </Grid>
  </div>
);

Header.propTypes = {
  onUserLogout: PropTypes.func.isRequired,
  user: userType.isRequired
};

export default Header;
