import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Message = ({ children }) => (
  <div className={styles.message}>{children}</div>
);

Message.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export { Message };
