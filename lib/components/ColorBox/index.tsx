import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { computeBoxClassName, computeBoxProps } from 'tgui-core/common/ui';
import type { ColorBoxProps } from './types';

/**
 * ## ColorBox
 *
 * Displays a 1-character wide colored square. Can be used as a status indicator,
 * or for visually representing a color.
 *
 * If you want to set a background color on an element, use a plain
 * [Box](https://github.com/tgstation/tgui-core/tree/main/lib/components/Box.tsx) instead.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-colorbox--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function ColorBox(props: ColorBoxProps) {
  const { className, color, content, ...rest } = props;
  const trimmedContent = content?.at(0);

  return (
    <div
      {...computeBoxProps(rest)}
      className={clsx('colorbox', className, computeBoxClassName(rest))}
      style={{ '--colorbox-bg': color } as CSSProperties}
    >
      {trimmedContent}
    </div>
  );
}
