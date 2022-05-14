import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { TextArea } from 'components/common/common';

import styles from './styles.module.scss';

const FormTextarea = ({ name, control, errors, placeholder, className }) => {
  const { field } = useController({ name, control });

  return (
    <div className={styles.inputWrapper}>
      <TextArea
        {...field}
        className={className}
        placeholder={placeholder}
      />
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

FormTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]),
  placeholder: PropTypes.string.isRequired
};

FormTextarea.defaultProps = {
  className: '',
  errors: {}
};

export default FormTextarea;
