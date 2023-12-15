import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { Control, useController } from 'react-hook-form';

import { IconName } from '~/libs/enums/enums.js';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';
import { ValueOf } from '~/libs/types/types.js';

type InputProps = {
  name: string;
  control: Control;
  errors?: object;
  disabled?: boolean;
  iconName?: ValueOf<typeof IconName>;
  placeholder: string;
  className: string;
  type: 'email' | 'password' | 'submit' | 'text';
  rows: number;
};

const Input: React.FC<InputProps> = ({
  name,
  control,
  type = 'text',
  rows = 0,
  errors = {},
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

export { Input };
