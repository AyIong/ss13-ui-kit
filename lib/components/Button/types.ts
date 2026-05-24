import type { BoxProps, IconProps } from '@components';
import type { Placement } from '@floating-ui/react';
import type { ReactNode } from 'react';

export type ButtonProps = Partial<{
  /** Captures keyboard events */
  captureKeys: boolean;
  /** Fill all available horizontal space */
  fluid: boolean;
  /** Makes the button circular, with fixed ratio size 1:1 */
  circular: boolean;
  /** Disables button and makes it semi-transparent */
  disabled: boolean;
  /** Activates the button (gives it a green color) */
  selected: boolean;
  /** Adds an left side icon to the button */
  startIcon: IconProps;
  /** Adds an right side icon to the button */
  endIcon: IconProps;
  /** A fancy, boxy tooltip, which appears when hovering over the button */
  tooltip: ButtonTooltip;
  /** Called when element is clicked */
  onClick: (event: any) => void;
}> &
  BoxProps;

type ButtonTooltip = {
  /** Content of the tooltip. Can be a string or a node */
  content: ReactNode;
  /** Position of the tooltip. Does not guarantee the position is respected. */
  position: Placement;
};
