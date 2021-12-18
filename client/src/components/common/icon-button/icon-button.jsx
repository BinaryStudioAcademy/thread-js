import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const IconButton = ({
  icon,
  label,
  onClick
}) => (
  <button className={styles.iconButton} type="button" onClick={onClick}>
    {icon}
    {label}
  </button>
);

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

IconButton.defaultProps = {
  label: ''
};

export default IconButton;
