import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconColor, IconName, IconSize } from '~/libs/enums/enums.js';

import { iconNameToSvgIcon } from './common.js';
import { ValueOf } from '~/libs/types/value-of.type.js';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

type IconProps = {
  className?: string;
  name: ValueOf<typeof IconName>;
  size?: SizeProp
  color?: ValueOf<typeof IconColor>;
  isLoading?: boolean;
};

const Icon: React.FC<IconProps> = ({
  className,
  name,
  size = IconSize.LARGE as SizeProp,
  color,
  isLoading
}) => (
  <FontAwesomeIcon
    className={className}
    icon={iconNameToSvgIcon[name]}
    size={size}
    color={color}
    spin={isLoading}
  />
);

export { Icon };
