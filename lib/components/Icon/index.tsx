import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { classes } from 'tgui-modern/common/react';
import type { IconProps, IconStackProps } from './types';

/**
 * ## Icon
 *
 * Renders one of the FontAwesome icons of your choice.
 *
 * Example:
 *
 * ```tsx
 * <Icon name="plus" />
 * ```
 *
 * Icons: https://fontawesome.com/search?ic=free-collection
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-icon--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-modern/?path=/docs/components-box--docs)
 */
export function Icon(props: IconProps) {
  const { name, size, className, rotation, animation, ...rest } = props;

  const customStyle = rest.style || {};
  if (size) {
    customStyle.fontSize = `${size * 100}%`;
  }
  if (rotation) {
    customStyle.transform = `rotate(${rotation}deg)`;
  }
  rest.style = customStyle;
  const boxProps = computeBoxProps(rest);
  const animationClass = animation && `fa-anim-${animation}`;

  return (
    <i
      className={classes(
        'icon',
        'fa',
        `fa-${name}`,
        animationClass,
        className,
        computeBoxClassName(rest),
      )}
      {...boxProps}
    />
  );
}

/**
 * ## Icon.Stack
 * Renders children icons on top of each other in order to make your own icon.
 *
 * Example:
 *
 * ```tsx
 * <Icon.Stack>
 *   <Icon name="pen" />
 *   <Icon name="slash" />
 * </Icon.Stack>
 * ```
 */
export function IconStack(props: IconStackProps) {
  const { className, children, size, ...rest } = props;

  const customStyle = rest.style || {};
  if (size) {
    customStyle.fontSize = `${size * 100}%`;
  }
  rest.style = customStyle;

  return (
    <span
      className={classes('icon-stack', className, computeBoxClassName<HTMLSpanElement>(rest))}
      {...computeBoxProps(rest)}
    >
      {children}
    </span>
  );
}
Icon.Stack = IconStack;
