import { type ReactElement } from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues
} from 'react-hook-form';

import { useController } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type CheckboxProperties<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
};

const Checkbox = <T extends FieldValues>({
  name,
  label,
  control
}: CheckboxProperties<T>): ReactElement => {
  const { field } = useController<T>({ name, control });

  return (
    <div className={styles['container']}>
      <input
        {...field}
        name={name}
        type="checkbox"
        id="toggle-checkbox"
        className={`${styles['switch']} ${styles['pointer']}`}
      />
      <label className={styles['pointer']} htmlFor="toggle-checkbox">
        {label}
      </label>
    </div>
  );
};

export { Checkbox };
