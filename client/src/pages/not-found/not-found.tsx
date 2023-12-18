import { NavLink } from 'react-router-dom';

import { Icon } from '~/libs/components/icon/icon.js';
import { AppRoute, IconName, IconSize } from '~/libs/enums/enums.js';

import styles from './styles.module.scss';

const NotFound: React.FC = () => (
  <h2 className={styles['title']}>
    <Icon size={IconSize.LARGE} name={IconName.FROWN} />
    <span className={styles['code']}>404 Not Found</span>
    Go to
    <NavLink to={AppRoute.ROOT}> Home </NavLink>
    page
  </h2>
);

export { NotFound };
