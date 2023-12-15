import { type Control, useController } from 'react-hook-form';

import styles from './styles.module.scss';

type CheckboxProps = {
  name: string;
  label: string;
  control: Control
};

const Checkbox: React.FC<CheckboxProps> = ({ name, label, control }) => {
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

export { Checkbox };
