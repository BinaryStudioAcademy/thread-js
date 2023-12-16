/* eslint-disable react/button-has-type */
import { type SizeProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import { type ReactNode } from 'react';

import {
  type ButtonColor,
  type IconName,
  type IconSize
} from '~/libs/enums/enums.js';
import { type ButtonType, type ValueOf } from '~/libs/types/types.js';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';

type ButtonProperties = {
  children?: ReactNode;
  type?: ButtonType;
  color?: ValueOf<typeof ButtonColor>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  iconName?: ValueOf<typeof IconName>;
  iconSize?: ValueOf<typeof IconSize>;
  isBasic?: boolean;
  isFluid?: boolean;
  isLoading?: boolean;
  isPrimary?: boolean;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProperties> = ({
  onClick,
  className,
  type = 'button',
  color,
  iconName,
  iconSize,
  isBasic = false,
  isFluid = false,
  isLoading = false,
  isPrimary = false,
  isDisabled = false,
  children
}) => {
  const hasIcon = Boolean(iconName);

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        styles['btn'],
        isLoading && styles['loading'],
        isFluid && styles['fluid'],
        isBasic && styles['basic'],
        isPrimary && styles['primary'],
        color && styles[`btn__${color}`],
        className
      )}
      type={type}
    >
      {hasIcon && (
        <Icon
          name={iconName as ValueOf<typeof IconName>}
          size={iconSize as SizeProp}
        />
      )}
      {children}
    </button>
  );
};

export { Button };
