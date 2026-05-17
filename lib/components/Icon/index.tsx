import { classes } from '@common/react';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import type { IconProps, IconStackProps } from './types';

const FA_OUTLINE_REGEX = /-o$/;

export function Icon(props: IconProps) {
  const { name = '', size, spin, className, rotation, ...rest } = props;

  const customStyle = rest.style || {};
  if (size) {
    customStyle.fontSize = `${size * 100}%`;
  }
  if (rotation) {
    customStyle.transform = `rotate(${rotation}deg)`;
  }
  rest.style = customStyle;

  const boxProps = computeBoxProps(rest);

  let iconClass = '';
  if (name.startsWith('tg-')) {
    // tgfont icon
    iconClass = name;
  } else {
    // font awesome icon
    const faRegular = FA_OUTLINE_REGEX.test(name);
    const faName = name.replace(FA_OUTLINE_REGEX, '');
    const preprendFa = !faName.startsWith('fa-');

    iconClass = faRegular ? 'far ' : 'fas ';
    if (preprendFa) {
      iconClass += 'fa-';
    }
    iconClass += faName;
    if (spin) {
      iconClass += ' fa-spin';
    }
  }

  return (
    <i
      className={classes([
        'Icon',
        iconClass,
        className,
        computeBoxClassName(rest),
      ])}
      {...boxProps}
    />
  );
}

function IconStack(props: IconStackProps) {
  const { className, children, size, ...rest } = props;

  const customStyle = rest.style || {};
  if (size) {
    customStyle.fontSize = `${size * 100}%`;
  }
  rest.style = customStyle;

  return (
    <span
      className={classes([
        'IconStack',
        className,
        computeBoxClassName<HTMLSpanElement>(rest),
      ])}
      {...computeBoxProps(rest)}
    >
      {children}
    </span>
  );
}

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
export namespace Icon {
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
  export const Stack = IconStack;
}
