import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Input = forwardRef(({
  disabled,
  icon,
  placeholder,
  type,
  value,
  ...fieldControls
}, ref) => (
  <div className={styles.inputContainer}>
    {icon && <span className={styles.icon}>{icon}</span>}
    <input
      className={`${styles.input} ${icon ? styles.withIcon : ''}`}
      placeholder={placeholder}
      ref={ref}
      type={type}
      disabled={disabled}
      value={value}
      {...fieldControls}
    />
  </div>
));

Input.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'password', 'submit', 'text']),
  value: PropTypes.string.isRequired
};

Input.defaultProps = {
  disabled: false,
  icon: null,
  type: 'text'
};

export default Input;
