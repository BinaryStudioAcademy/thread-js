import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon as IconUI } from 'semantic-ui-react';
import { IconColor, IconName, IconSize } from 'src/common/enums/enums';

const Icon = ({ name, size, color }) => (
  <IconUI name={name} size={size} color={color} />
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
