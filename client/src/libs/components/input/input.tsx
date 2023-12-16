import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { type ReactElement } from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues
} from 'react-hook-form';

import { type IconName } from '~/libs/enums/enums.js';
import { useController } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';

type InputProperties<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  errors?: object;
  disabled?: boolean;
  iconName?: ValueOf<typeof IconName>;
  placeholder: string;
  className?: string;
  type?: 'email' | 'password' | 'submit' | 'text';
  rows?: number;
};

const Input = <T extends FieldValues>({
  name,
  control,
  type = 'text',
  rows = 0,
  errors = {},
  disabled,
  iconName,
  placeholder,
  className
}: InputProperties<T>): ReactElement => {
  const { field } = useController<T>({ name, control });
  const isTextarea = Boolean(rows);

  return (
    <div className={styles['inputWrapper']}>
      <div className={styles['inputContainer']}>
        {iconName && (
          <span className={styles['icon']}>
            <Icon name={iconName} />
          </span>
        )}
        {isTextarea ? (
          <textarea
            {...field}
            name={name}
            rows={rows}
            placeholder={placeholder}
            className={clsx(styles['textArea'], className)}
          />
        ) : (
          <input
            {...field}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={clsx(
              styles['input'],
              iconName && styles['withIcon'],
              className
            )}
          />
        )}
      </div>
      <span className={styles['errorWrapper']}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Input };
