import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const UiSegment = ({ children }) => (
  <div className={styles.uiSegment}>
    {children}
  </div>
);

UiSegment.propTypes = {
  children: PropTypes.element.isRequired
};

export default UiSegment;

