/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  ButtonColor,
  IconName,
  IconSize
} from '~/libs/enums/enums.js';

import {
  ButtonType
} from '~/libs/types/types.js';

import { Icon } from '../icon/icon.jsx';
import styles from './styles.module.scss';
import { ReactNode } from 'react';
import { ValueOf } from '~/libs/types/value-of.type.js';

type ButtonProps = {
  children?: ReactNode;
  type?: ButtonType;
  color?: ValueOf<typeof ButtonColor>;
  onClick?: () => any;
  className?: string;
  iconName?: ValueOf<typeof IconName>;
  iconSize?: ValueOf<typeof IconSize>
  isBasic?: boolean;
  isFluid?: boolean;
  isLoading?: boolean;
  isPrimary?: boolean;
  isDisabled?: boolean;
}

const Button = ({
  onClick = null,
  className = null,
  type = 'button',
  color = null,
  iconName = null,
  iconSize = null,
  isBasic = false,
  isFluid = false,
  isLoading = false,
  isPrimary = false,
  isDisabled = false,
  children = null
}: ButtonProps ) => {
  const hasIcon = Boolean(iconName);

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        styles.btn,
        isLoading && styles.loading,
        isFluid && styles.fluid,
        isBasic && styles.basic,
        isPrimary && styles.primary,
        color && styles[`btn__${color}`],
        className
      )}
      type={type}
    >
      {hasIcon && <Icon name={iconName} size={iconSize} />}
      {children}
    </button>
  );
};



export { Button };
