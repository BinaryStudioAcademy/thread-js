import { NavLink } from 'react-router-dom';

import { AppRoute, IconName, IconSize } from '~/libs/enums/enums.js';
import {
  DEFAULT_USER_AVATAR,
  type UserWithImageRelation
} from '~/packages/user/user.js';

import { Button } from '../button/button.js';
import { Icon } from '../icon/icon.js';
import { Image } from '../image/image.js';
import styles from './styles.module.scss';

type HeaderProperties = {
  onUserLogout: React.MouseEventHandler<HTMLButtonElement>;
  user: UserWithImageRelation;
};

const Header: React.FC<HeaderProperties> = ({ user, onUserLogout }) => (
  <div className={styles['headerWrp']}>
    {user && (
      <NavLink to={AppRoute.ROOT}>
        <div className={styles['userWrapper']}>
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
      <NavLink to={AppRoute.PROFILE} className={styles['menuBtn'] as string}>
        <Icon name={IconName.USER_CIRCLE} size={IconSize.LARGE} />
      </NavLink>
      <Button
        className={`${styles['menuBtn']} ${styles['logoutBtn']}`}
        onClick={onUserLogout}
        type="button"
        iconName={IconName.LOG_OUT}
        iconSize={IconSize.LARGE}
        isBasic
      />
    </div>
  </div>
);

export { Header };
