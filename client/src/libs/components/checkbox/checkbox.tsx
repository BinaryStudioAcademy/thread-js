import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

import styles from './styles.module.scss';

const Checkbox = ({ name, label, control }) => {
  const { field } = useController({ name, control });

  return (
    <div className={styles.container}>
      <input
        {...field}
        name={name}
        type="checkbox"
        id="toggle-checkbox"
        className={`${styles.switch} ${styles.pointer}`}
      />
      <label className={styles.pointer} htmlFor="toggle-checkbox">
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired
};

export { Checkbox };
