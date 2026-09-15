import type { Placement } from '@floating-ui/react';
import type { ReactNode } from 'react';

export type TooltipProps = Partial<{
  /** Hovering this element will show the tooltip */
  children: ReactNode;
  /**
   * By default, tooltip opens when you hover on his child.
   * This prop allows you to manually control open state
   */
  isOpen: boolean;
}> &
  TooltipContentProps;

export type TooltipContentProps = {
  /** Content of the tooltip. Can be a string or a node */
  content: ReactNode;
} & Partial<{
  /** Position of the tooltip. Does not guarantee the position is respected. */
  position?: Placement;
}>;
