import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Checkbox = ({ isChecked, label, onChange }) => (
  <div className={styles.container}>
    <input
      checked={isChecked}
      className={`${styles.switch} ${styles.pointer}`}
      id="toggle-checkbox"
      onChange={onChange}
      type="checkbox"
    />
    <label className={styles.pointer} htmlFor="toggle-checkbox">{label}</label>
  </div>
);

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
