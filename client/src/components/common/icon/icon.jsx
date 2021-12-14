import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconColor, IconName, IconSize } from 'common/enums/enums';
import { iconNameToSvgIcon } from './common';

const Icon = ({ name, size, color }) => (
  <FontAwesomeIcon
    icon={iconNameToSvgIcon[name]}
    size={size}
    color={color}
  />
);

Icon.propTypes = {
  name: PropTypes.oneOf(Object.values(IconName)).isRequired,
  size: PropTypes.oneOf(Object.values(IconSize)),
  color: PropTypes.oneOf(Object.values(IconColor))
};

Icon.defaultProps = {
  size: null,
  color: null
};

export default Icon;
