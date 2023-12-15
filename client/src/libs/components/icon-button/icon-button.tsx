
import { IconName } from '~/libs/enums/enums.js';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';
import { ValueOf } from '~/libs/types/value-of.type.js';

type IconButtonProps = {
  iconName: ValueOf<typeof IconName>;
  label?: string | number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton: React.FC<IconButtonProps> = ({ iconName, label = '', onClick }) => (
  <button className={styles.iconButton} type="button" onClick={onClick}>
    <Icon name={iconName} />
    {label}
  </button>
);

export { IconButton };
