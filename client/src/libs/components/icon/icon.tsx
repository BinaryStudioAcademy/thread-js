import { type SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type IconColor, type IconName } from '~/libs/enums/enums.js';
import { IconSize } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { iconNameToSvgIcon } from './common.js';

type IconProperties = {
  className?: string;
  name: ValueOf<typeof IconName>;
  size?: SizeProp;
  color?: ValueOf<typeof IconColor>;
  isLoading?: boolean;
};

const Icon: React.FC<IconProperties> = ({
  className,
  name,
  size = IconSize.LARGE as SizeProp,
  color,
  isLoading = false
}) => (
  <FontAwesomeIcon
    className={className as string}
    icon={iconNameToSvgIcon[name]}
    size={size}
    color={color as string}
    spin={isLoading}
  />
);

export { Icon };
