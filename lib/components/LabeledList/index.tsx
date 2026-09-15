import { Box, Tooltip } from '@components';
import clsx from 'clsx';
import type { PropsWithChildren, ReactNode } from 'react';
import { colorClassName } from 'tgui-core/common/color';
import type { LabeledListItemProps } from './types';

export function LabeledList(props: PropsWithChildren) {
  const { children } = props;
  return <div className={'labeledlist'}>{children}</div>;
}

function LabeledListItem(props: LabeledListItemProps) {
  const {
    className,
    label,
    labelColor,
    labelWrap,
    color,
    textAlign,
    buttons,
    children,
    verticalAlign = 'baseline',
    preserveWhitespace,
    tooltip,
  } = props;

  let innerLabel: ReactNode;
  if (label) {
    innerLabel = label;
    if (typeof label === 'string') innerLabel += ':';
  }

  if (tooltip) {
    innerLabel = (
      <Tooltip content={tooltip.content} position={tooltip.position}>
        <span>{innerLabel}</span>
      </Tooltip>
    );
  }

  const labelChild = (
    <Box
      className={clsx(
        'labeledlist-cell label',
        tooltip && 'tooltiped',
        // Kinda flipped because we want nowrap as default. Cleaner CSS this way though.
        !labelWrap && 'nowrap',
        colorClassName(labelColor || 'label'),
      )}
      verticalAlign={verticalAlign}
      preserveWhitespace={preserveWhitespace}
    >
      {innerLabel}
    </Box>
  );

  return (
    <div className={clsx('labeledlist-row', className)}>
      {labelChild}
      <Box
        className={clsx('labeledlist-cell', colorClassName(color || 'text'))}
        textAlign={textAlign}
        verticalAlign={verticalAlign}
      >
        {children}
      </Box>
      {buttons && <td className="labeledlist-buttons">{buttons}</td>}
    </div>
  );
}

/**
 * ## LabeledList
 *
 * LabeledList is a continuous, vertical list of text and other content, where
 * every item is labeled.
 *
 * It works just like a two column table, where first column is labels, and
 * second column is content.
 *
 * Example:
 *
 * ```tsx
 * <LabeledList>
 *   <LabeledList.Item label="Item">Content</LabeledList.Item>
 * </LabeledList>
 * ```
 *
 * If you want to have a button on the right side of an item (for example,
 * to perform some sort of action), there is a way to do that:
 *
 * Example:
 *
 * ```tsx
 * <LabeledList>
 *   <LabeledList.Item label="Item" buttons={<Button>Click me!</Button>}>
 *     Content
 *   </LabeledList.Item>
 * </LabeledList>
 * ```
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-labeledlist--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export namespace LabeledList {
  export const Item = LabeledListItem;
}
