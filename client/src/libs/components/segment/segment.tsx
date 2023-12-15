import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Segment = ({ children }) => (
  <div className={styles.segment}>{children}</div>
);

Segment.propTypes = {
  children: PropTypes.node.isRequired
};

export { Segment };
