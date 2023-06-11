import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  AppRoute,
  ButtonType,
  IconName,
  IconSize
} from '~/libs/enums/enums.js';
import { userType } from '~/libs/prop-types/property-types.js';
import { DEFAULT_USER_AVATAR } from '~/packages/user/constants/constants.js';

import { Button } from '../button/button.jsx';
import { Icon } from '../icon/icon.jsx';
import { Image } from '../image/image.jsx';
import styles from './styles.module.scss';

const Header = ({ user, onUserLogout }) => (
  <div className={styles.headerWrp}>
    {user && (
      <NavLink to={AppRoute.ROOT}>
        <div className={styles.userWrapper}>
          <Image
            isCircular
            width="45"
            height="45"
            src={user.image?.link ?? DEFAULT_USER_AVATAR}
            alt="user avatar"
          />{' '}
          {user.username}
        </div>
      </NavLink>
    )}
    <div>
      <NavLink to={AppRoute.PROFILE} className={styles.menuBtn}>
        <Icon name={IconName.USER_CIRCLE} size={IconSize.LARGE} />
      </NavLink>
      <Button
        className={`${styles.menuBtn} ${styles.logoutBtn}`}
        onClick={onUserLogout}
        type={ButtonType.BUTTON}
        iconName={IconName.LOG_OUT}
        iconSize={IconSize.LARGE}
        isBasic
      />
    </div>
  </div>
);

Header.propTypes = {
  onUserLogout: PropTypes.func.isRequired,
  user: userType.isRequired
};

export { Header };
