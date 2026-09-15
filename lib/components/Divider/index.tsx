import clsx from 'clsx';
import type { CSSProperties } from 'react';

type Props = Partial<{
  /** Divider thickness. */
  size: number;
  /** Divide content vertically. */
  vertical: boolean;
}>;

/**
 *
 * ## Divider
 *
 * Draws a horizontal or vertical line, dividing a section into groups.
 * Works like the good old `<hr>` element, but it's fancier.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-divider--docs)
 */
export function Divider(props: Props) {
  const { size, vertical } = props;
  return (
    <div
      className={clsx('divider', vertical && 'divider-vertical')}
      style={{ '--size': size } as CSSProperties}
    />
  );
}
