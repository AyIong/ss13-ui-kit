import clsx from 'clsx';

type Props = Partial<{
  /**
   * Divider can divide content without creating a dividing line.
   * @deprecated Use flex gap (<Stack g={} />) or margins.
   */
  hidden: boolean;
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
  const { hidden, vertical } = props;

  return (
    <div
      className={clsx(
        'divider',
        hidden && 'divider-hidden',
        vertical && 'divider-vertical',
      )}
    />
  );
}
