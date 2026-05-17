import { Floating } from '@components';
import type { TooltipProps } from './types';

/**
 * ## Tooltip
 *
 * Displays a tooltip when hovering over the element. The tooltip
 * can be customized with a custom content and position.
 *
 * Example:
 *
 * ```tsx
 * <Tooltip content="This is a tooltip" position="top">
 *   <Box>Hover over me</Box>
 * </Tooltip>
 * ```
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-tooltip--docs)
 */
export function Tooltip(props: TooltipProps) {
  const { content, children, position } = props;
  return (
    <Floating
      content={content}
      contentClasses="Tooltip"
      hoverOpen
      placement={position}
    >
      {children}
    </Floating>
  );
}
