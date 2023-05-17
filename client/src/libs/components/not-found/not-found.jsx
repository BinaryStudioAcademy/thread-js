import { IconName, IconSize, AppRoute } from 'libs/enums/enums';
import { Icon, NavLink } from 'libs/components/common/common';
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

export { NotFound };
