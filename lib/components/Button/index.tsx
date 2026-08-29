import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { type BoxProps, Icon, type IconProps, Tooltip } from '@components';
import { useButton } from '@hooks';
import clsx from 'clsx';
import type {
  ButtonBaseProps,
  ButtonContentProps,
  ButtonIconProps,
  ButtonProps,
} from './types';

export function ButtonContainer(props: ButtonBaseProps) {
  const {
    children,
    fluid,
    color,
    variant = 'filled',
    className,
    disabled,
    selected,
    tooltip,
    ...rest
  } = props;

  let finalButtonContainer = (
    <button
      className={clsx([
        className,
        'button',
        variant,
        fluid && 'fluid',
        disabled && 'disabled',
        selected && 'selected',
        `bg-${color ? color : 'primary'}`,
        computeBoxClassName(rest),
      ])}
      {...computeBoxProps(rest)}
    >
      {children}
    </button>
  );

  if (tooltip) {
    finalButtonContainer = (
      <Tooltip content={tooltip.content} position={tooltip.position}>
        {finalButtonContainer}
      </Tooltip>
    );
  }

  return finalButtonContainer;
}

export function ButtonIcon(props: ButtonIconProps & BoxProps) {
  const iconProps = typeof props === 'string' ? { name: props } : props;
  return (
    <Icon
      className={clsx(props.className, 'button-icon')}
      {...(iconProps as IconProps)}
    />
  );
}

export function renderIcon(icon: ButtonIconProps) {
  return (
    <ButtonIcon
      {...((typeof icon === 'string' ? { name: icon } : icon) as IconProps)}
    />
  );
}

export function ButtonContent(props: ButtonContentProps) {
  const { children, innerStyle, className } = props;
  return (
    <div className={clsx(className, 'button-content')} style={innerStyle}>
      {children}
    </div>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    circular,
    startIcon,
    endIcon,
    disabled,
    className,
    innerStyle,
    captureKeys,
    onClick,
    ...rest
  } = props;
  const interactions = useButton({
    captureKeys,
    disabled,
    onClick,
  });

  return (
    <ButtonContainer
      className={clsx([circular && 'circular', className])}
      {...rest}
      {...interactions}
    >
      {startIcon && renderIcon(startIcon)}
      {children && (
        <ButtonContent innerStyle={innerStyle}>{children}</ButtonContent>
      )}
      {endIcon && renderIcon(endIcon)}
    </ButtonContainer>
  );
}
