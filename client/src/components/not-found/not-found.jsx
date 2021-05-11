import * as React from 'react';
import { IconName, IconSize, AppRoute } from 'src/common/enums/enums';
import { Icon, NavLink } from 'src/components/common/common';
import styles from './styles.module.scss';

const NotFound = () => (
  <h2 className={styles.title}>
    <Icon size={IconSize.LARGE} name={IconName.FROWN} />
    <span className={styles.code}>404 Not Found</span>
    Go to
    <NavLink to={AppRoute.ROOT}> Home </NavLink>
    page
  </h2>
);

export default NotFound;
