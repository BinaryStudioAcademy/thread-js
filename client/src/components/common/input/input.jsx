import { forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { IconName } from 'common/enums/enums.js';
import Icon from '../icon/icon.jsx';

import styles from './styles.module.scss';

const Input = forwardRef(({
  disabled,
  iconName,
  placeholder,
  type,
  value,
  ...fieldControls
}, ref) => (
  <div className={styles.inputContainer}>
    {iconName && <span className={styles.icon}><Icon name={iconName} /></span>}
    <input
      className={clsx(styles.input, iconName && styles.withIcon)}
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
  iconName: PropTypes.oneOf(Object.values(IconName)),
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'password', 'submit', 'text']),
  value: PropTypes.string.isRequired
};

Input.defaultProps = {
  disabled: false,
  iconName: null,
  type: 'text'
};

export default Input;
