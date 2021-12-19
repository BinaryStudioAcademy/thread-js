import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './styles.module.scss';

const TextArea = ({ name, className, onChange, placeholder, rows, value }) => (
  <textarea
    className={clsx(styles.textArea, className)}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    value={value}
  />
);

TextArea.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  rows: PropTypes.number,
  value: PropTypes.string.isRequired
};

TextArea.defaultProps = {
  className: undefined,
  name: '',
  rows: 3
};

export default TextArea;
