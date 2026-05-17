import type { Placement } from '@floating-ui/react';
import type { ReactNode } from 'react';

export type TooltipProps = {
  /** The content to display in the tooltip */
  content: ReactNode;
} & Partial<{
  /** Hovering this element will show the tooltip */
  children: ReactNode;
  /** Where to place the tooltip relative to the reference element */
  position: Placement;
}>;
