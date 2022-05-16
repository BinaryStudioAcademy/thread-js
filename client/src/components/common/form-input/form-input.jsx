import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { IconName } from 'common/enums/enums.js';
import Input from '../input/input.jsx';

import styles from './styles.module.scss';

const FormInput = ({ name, control, errors, type, placeholder, iconName }) => {
  const { field } = useController({ name, control });

  return (
    <div className={styles.inputWrapper}>
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        iconName={iconName}
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
  iconName: PropTypes.oneOf(Object.values(IconName)).isRequired
};

export default FormInput;
