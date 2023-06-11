import PropTypes from 'prop-types';

import { IconName } from '~/libs/enums/enums.js';

import { Icon } from '../icon/icon.jsx';
import styles from './styles.module.scss';

const IconButton = ({ iconName, label, onClick }) => (
  <button className={styles.iconButton} type="button" onClick={onClick}>
    <Icon name={iconName} />
    {label}
  </button>
);

IconButton.propTypes = {
  iconName: PropTypes.oneOf(Object.values(IconName)).isRequired,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func.isRequired
};

IconButton.defaultProps = {
  label: ''
};

export { IconButton };
