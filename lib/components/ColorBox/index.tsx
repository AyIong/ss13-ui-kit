import { classes } from 'tgui-modern/common/react';
import { computeBoxClassName, computeBoxProps } from 'tgui-modern/common/ui';
import type { ColorBoxProps } from './types';

/**
 * ## ColorBox
 *
 * Displays a 1-character wide colored square. Can be used as a status indicator,
 * or for visually representing a color.
 *
 * If you want to set a background color on an element, use a plain
 * [Box](https://github.com/tgstation/tgui-modern/tree/main/lib/components/Box.tsx) instead.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-colorbox--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-modern/?path=/docs/components-box--docs)
 */
export function ColorBox(props: ColorBoxProps) {
  const { className, style, color, content, ...rest } = props;
  const trimmedContent = content?.at(0);

  return (
    <div
      className={classes('colorbox', className, computeBoxClassName(rest))}
      {...computeBoxProps({
        style: { '--colorbox-bg': color, ...style },
        ...rest,
      })}
    >
      {trimmedContent}
    </div>
  );
}
