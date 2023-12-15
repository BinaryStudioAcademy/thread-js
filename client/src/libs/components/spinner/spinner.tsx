import PropTypes from 'prop-types';

import styles from './styles.module.scss';

type SpinnerProps = {
  isOverflow: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ isOverflow }) =>
  isOverflow ? (
    <div className={styles.container}>
      <div className={styles.loader}>Loading...</div>
    </div>
  ) : (
    <div className={styles.loader}>Loading...</div>
  );

export { Spinner };
