import { classes } from '@common/react';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { Icon, type IconProps, Tooltip } from '@components';
import type { Placement } from '@floating-ui/react';
import type { PropsWithChildren } from 'react';
import { useInteractions } from 'ss13-ui-kit/common/hooks';
import type { ButtonBaseProps, ButtonProps } from './types';

export function ButtonContainer(props: ButtonBaseProps) {
  const {
    children,
    captureKeys,
    fluid,
    color,
    className,
    disabled,
    selected,
    tooltip,
    onClick,
    ...rest
  } = props;
  const interactions = useInteractions({
    disabled,
    captureKeys,
    onClick,
  });

  let finalButtonContainer = (
    <button
      className={classes([
        'button',
        fluid && 'fluid',
        !children && 'icon-only',
        disabled && 'disabled',
        selected && 'selected',
        color && color,
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
Button.Container = ButtonContainer;

export function ButtonIcon(props: IconProps) {
  return <Icon className="button-icon" {...props} />;
}
Button.Icon = ButtonIcon;

export function ButtonContent(props: PropsWithChildren) {
  const { children } = props;
  return children && <div className="button-content">{children}</div>;
}
Button.Content = ButtonContent;

export function Button(props: ButtonProps) {
  const { children, circular, startIcon, endIcon, ...rest } = props;

  return (
    <Button.Container {...rest}>
      {startIcon && <Button.Icon {...startIcon} />}
      <Button.Content>{children}</Button.Content>
      {endIcon && <Button.Icon {...endIcon} />}
    </Button.Container>
  );
}
