import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import styles from './styles.module.scss';

const FormInput = ({ name, control, errors, type, placeholder, icon }) => {
  const { field } = useController({ name, control });

  return (
    <div className={styles.inputWrapper}>
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        icon={icon}
        iconPosition="left"
      />
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default FormInput;