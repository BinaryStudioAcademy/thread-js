import { type IconName } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';

type IconButtonProperties = {
  iconName: ValueOf<typeof IconName>;
  label?: string | number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton: React.FC<IconButtonProperties> = ({
  iconName,
  label = '',
  onClick
}) => (
  <button className={styles['iconButton']} type="button" onClick={onClick}>
    <Icon name={iconName} />
    {label}
  </button>
);

export { IconButton };
