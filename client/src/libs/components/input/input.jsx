import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

import { IconName } from '~/libs/enums/enums.js';

import { Icon } from '../icon/icon.jsx';
import styles from './styles.module.scss';

const Input = ({
  name,
  control,
  type,
  rows,
  errors,
  disabled,
  iconName,
  placeholder,
  className
}) => {
  const { field } = useController({ name, control });
  const isTextarea = Boolean(rows);

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        {iconName && (
          <span className={styles.icon}>
            <Icon name={iconName} />
          </span>
        )}
        {isTextarea ? (
          <textarea
            {...field}
            name={name}
            rows={rows}
            placeholder={placeholder}
            className={clsx(styles.textArea, className)}
          />
        ) : (
          <input
            {...field}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={clsx(
              styles.input,
              iconName && styles.withIcon,
              className
            )}
          />
        )}
      </div>
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]),
  disabled: PropTypes.bool,
  iconName: PropTypes.oneOf(Object.values(IconName)),
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password', 'submit', 'text']),
  rows: PropTypes.number
};

Input.defaultProps = {
  disabled: false,
  iconName: null,
  className: '',
  type: 'text',
  rows: 0,
  errors: {}
};

export { Input };
