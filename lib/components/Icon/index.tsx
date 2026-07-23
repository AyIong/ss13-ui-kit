import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { tgIcons } from './icons';
import type { IconNamesUnion, IconProps, IconStackProps } from './types';

// "Activate" imported FontAwesome icons
library.add(fas, far, tgIcons);

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
 * Icons: https://fontawesome.com/v6/search?o=r&m=free
 *
 * - [View documentation on tgui core](http://localhost:6006/?path=/docs/components-icon--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function Icon(props: IconProps) {
  const { name, regular, size, className, rotation, animation, ...rest } =
    props;

  const customStyle = rest.style || {};
  if (size) {
    customStyle.fontSize = `${size * 100}%`;
  }
  if (rotation) {
    customStyle.transform = `rotate(${rotation}deg)`;
  }
  rest.style = customStyle;

  const boxProps = computeBoxProps(rest);

  return (
    <FontAwesomeIcon
      // @ts-expect-error: Allow to use custom icons
      icon={[regular ? 'far' : 'fas', name as IconNamesUnion]}
      className={clsx([className, 'icon', computeBoxClassName(rest)])}
      style={customStyle}
      {...rest}
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
      className={clsx([
        'icon-stack',
        className,
        computeBoxClassName<HTMLSpanElement>(rest),
      ])}
      {...computeBoxProps(rest)}
    >
      {children}
    </span>
  );
}
Icon.Stack = IconStack;
