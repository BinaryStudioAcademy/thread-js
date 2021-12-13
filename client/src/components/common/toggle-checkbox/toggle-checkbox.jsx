import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ToggleCheckbox = ({ checked, label, onChange }) => (
  <div className={styles.container}>
    <input
      checked={checked}
      className={`${styles.switch} ${styles.pointer}`}
      id="toggle-checkbox"
      onChange={onChange}
      type="checkbox"
    />
    <label className={styles.pointer} htmlFor="toggle-checkbox">{label}</label>
  </div>
);

ToggleCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ToggleCheckbox;
