import * as React from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonUI } from 'semantic-ui-react';
import {
  ButtonType,
  ButtonColor,
  IconName,
  IconSize
} from 'src/common/enums/enums';
import { Icon } from 'src/components/common/common';

const Button = ({
  onClick,
  className,
  type,
  color,
  iconName,
  iconSize,
  isBasic,
  isFluid,
  isLoading,
  isPrimary,
  isDisabled,
  children
}) => {
  const hasIcon = Boolean(iconName);

  // eslint-disable-next-line react/prop-types
  const Btn = ({ children: childrenIcon }) => (
    <ButtonUI
      className={className}
      onClick={onClick}
      type={type}
      color={color}
      icon={hasIcon}
      basic={isBasic}
      fluid={isFluid}
      loading={isLoading}
      primary={isPrimary}
      disabled={isDisabled}
    >
      <>
        {childrenIcon}
        {children}
      </>
    </ButtonUI>
  );

  return hasIcon ? (
    <Btn>
      <Icon name={iconName} size={iconSize} />
    </Btn>
  ) : (
    <Btn />
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.values(ButtonType)),
  color: PropTypes.oneOf(Object.values(ButtonColor)),
  className: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconName)),
  iconSize: PropTypes.oneOf(Object.values(IconSize)),
  isBasic: PropTypes.bool,
  isFluid: PropTypes.bool,
  isLoading: PropTypes.bool,
  isPrimary: PropTypes.bool,
  isDisabled: PropTypes.bool
};

Button.defaultProps = {
  type: ButtonType.BUTTON,
  onClick: null,
  children: null,
  color: null,
  className: null,
  iconSize: null,
  iconName: null,
  isBasic: false,
  isFluid: false,
  isLoading: false,
  isPrimary: false,
  isDisabled: false
};

export default Button;
