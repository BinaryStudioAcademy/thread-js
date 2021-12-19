import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const TextArea = ({ name, onChange, placeholder, rows, value }) => (
  <textarea
    className={styles.textArea}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    value={value}
  />
);

TextArea.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  rows: PropTypes.number,
  value: PropTypes.string.isRequired
};

TextArea.defaultProps = {
  name: '',
  rows: 3
};

export default TextArea;
