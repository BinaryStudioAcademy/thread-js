import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import { IconColor, IconName, IconSize } from '~/libs/enums/enums.js';

import { iconNameToSvgIcon } from './common.js';

const Icon = ({ className, name, size, color, isLoading }) => (
  <FontAwesomeIcon
    className={className}
    icon={iconNameToSvgIcon[name]}
    size={size}
    color={color}
    spin={isLoading}
  />
);

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf(Object.values(IconName)).isRequired,
  size: PropTypes.oneOf(Object.values(IconSize)),
  color: PropTypes.oneOf(Object.values(IconColor)),
  isLoading: PropTypes.bool
};

Icon.defaultProps = {
  className: undefined,
  size: IconSize.LARGE,
  color: null,
  isLoading: false
};

export { Icon };
