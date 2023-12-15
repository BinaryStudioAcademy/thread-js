import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Spinner = ({ isOverflow }) =>
  isOverflow ? (
    <div className={styles.container}>
      <div className={styles.loader}>Loading...</div>
    </div>
  ) : (
    <div className={styles.loader}>Loading...</div>
  );

Spinner.propTypes = {
  isOverflow: PropTypes.bool
};

Spinner.defaultProps = {
  isOverflow: false
};

export { Spinner };
