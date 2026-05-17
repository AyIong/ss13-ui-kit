import { classes } from '@common/react';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { useRef } from 'react';
import type { StackDividerProps, StackItemProps, StackProps } from './types';

/**
 * ## Stack
 *
 * A higher-level component that uses
 * [flexbox](https://developer.mozilla.org/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts)
 * with automatic [spacing](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/gap)
 * between nested containers.
 *
 * Consists of two elements: `<Stack>` and `<Stack.Item>`.
 * Stacks can be vertical by adding a `vertical` property.
 * Example:
 * ```tsx
 * <Stack vertical>
 *   <Stack.Item grow>Button description</Stack.Item>
 *   <Stack.Item>
 *     <Button>Perform an action</Button>
 *   </Stack.Item>
 * </Stack>
 * ```
 *
 * **High level window layout**
 * Stacks can be used for high level window layout.
 * Make sure to use the `fill` property.
 * Example:
 * ```tsx
 * <Window>
 *   <Window.Content>
 *     <Stack fill>
 *       <Stack.Item>
 *         <Section fill>Sidebar</Section>
 *       </Stack.Item>
 *       <Stack.Item grow>
 *         <Stack fill vertical>
 *           <Stack.Item grow>
 *             <Section fill scrollable>
 *               Main content
 *             </Section>
 *           </Stack.Item>
 *           <Stack.Item>
 *             <Section>Bottom pane</Section>
 *           </Stack.Item>
 *         </Stack>
 *       </Stack.Item>
 *     </Stack>
 *   </Window.Content>
 * </Window>
 * ```
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-stack--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function Stack(props: StackProps) {
  const {
    className,
    vertical,
    fill,
    reverse,
    zebra,
    align,
    wrap,
    justify,
    direction,
    inlineFlex,
    ...rest
  } = props;

  const directionPrefix = vertical ? 'column' : 'row';
  const directionSuffix = reverse ? '-reverse' : '';

  return (
    <div
      className={classes([
        'stack',
        fill && 'fill',
        vertical ? 'vertical' : 'horizontal',
        inlineFlex && 'inline',
        zebra && 'zebra',
        reverse && `reverse${vertical ? '-vertical' : ''}`,
        className,
        computeBoxClassName(props),
      ])}
      {...computeStackProps({
        direction: `${directionPrefix}${directionSuffix}`,
        ...rest,
      })}
    />
  );
}

function computeStackProps(props: StackProps) {
  const { direction, wrap, align, justify, ...rest } = props;
  return computeBoxProps({
    style: {
      ...rest.style,
      alignItems: align,
      flexDirection: direction,
      flexWrap: wrap === true ? 'wrap' : wrap,
      justifyContent: justify,
    },
    ...rest,
  });
}

function computeStackItemProps(props: StackItemProps) {
  const { style, grow, order, shrink, basis, align, ...rest } = props;
  return computeBoxProps({
    style: {
      ...style,
      alignSelf: align,
      flexBasis: basis,
      flexGrow: grow !== undefined && Number(grow),
      flexShrink: shrink !== undefined && Number(shrink),
      order: order,
    },
    ...rest,
  });
}

function StackItem(props: StackItemProps) {
  const { className, innerRef, ...rest } = props;
  const ref = useRef<HTMLDivElement>(innerRef?.current || null);
  return (
    <div
      ref={ref}
      className={classes(['stack-item', className, computeBoxClassName(rest)])}
      {...computeStackItemProps(rest)}
    />
  );
}
Stack.Item = StackItem;

function StackDivider(props: StackDividerProps) {
  const { className, hidden, ...rest } = props;
  return (
    <div
      className={classes([
        'stack-divider',
        hidden && 'hidden',
        className,
        computeBoxClassName(rest),
      ])}
      {...computeStackItemProps(rest)}
    />
  );
}
Stack.Divider = StackDivider;
