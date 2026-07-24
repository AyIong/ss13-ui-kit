import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { Icon, type IconProps, Tooltip } from '@components';
import type { Placement } from '@floating-ui/react';
import { useButton } from '@hooks';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import type { ButtonBaseProps, ButtonIconProps, ButtonProps } from './types';

export function ButtonContainer(props: ButtonBaseProps) {
  const {
    children,
    captureKeys,
    fluid,
    color,
    variant = 'filled',
    className,
    disabled,
    selected,
    tooltip,
    onClick,
    ...rest
  } = props;
  const interactions = useButton({
    captureKeys,
    disabled,
    onClick,
  });

  let finalButtonContainer = (
    <button
      className={clsx([
        'button',
        variant,
        fluid && 'fluid',
        disabled && 'disabled',
        selected && 'selected',
        `bg-${color ? color : 'primary'}`,
        className,
        computeBoxClassName(rest),
      ])}
      {...interactions}
      {...computeBoxProps(rest)}
    >
      {children}
    </button>
  );

  if (tooltip) {
    finalButtonContainer = (
      <Tooltip
        content={tooltip.content}
        position={tooltip.position as Placement}
      >
        {finalButtonContainer}
      </Tooltip>
    );
  }

  return finalButtonContainer;
}

export function ButtonIcon(props: ButtonIconProps) {
  const iconProps = typeof props === 'string' ? { name: props } : props;
  return <Icon className="button-icon" {...(iconProps as IconProps)} />;
}

export function renderIcon(icon: ButtonIconProps) {
  return (
    <ButtonIcon
      {...((typeof icon === 'string' ? { name: icon } : icon) as IconProps)}
    />
  );
}

export function ButtonContent(props: PropsWithChildren) {
  const { children } = props;
  return <div className="button-content">{children}</div>;
}

export function Button(props: ButtonProps) {
  const { children, circular, startIcon, endIcon, className, ...rest } = props;

  return (
    <ButtonContainer
      className={clsx([circular && 'circular', className])}
      {...rest}
    >
      {startIcon && renderIcon(startIcon)}
      {children && <ButtonContent>{children}</ButtonContent>}
      {endIcon && renderIcon(endIcon)}
    </ButtonContainer>
  );
}
