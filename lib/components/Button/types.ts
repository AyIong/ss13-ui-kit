import type { BoxProps, IconProps } from '@components';
import type { Placement } from '@floating-ui/react';
import type { ReactNode } from 'react';
import type { IconNamesUnion } from '../Icon/types';

type ButtonTooltip = {
  /** Content of the tooltip. Can be a string or a node */
  content: ReactNode;
  /** Position of the tooltip. Does not guarantee the position is respected. */
  position?: Placement;
};

export type ButtonInteractionProps = Partial<{
  /** Captures keyboard events */
  captureKeys: boolean;
  /** Called when element is clicked */
  onClick: (event: any) => void;
  /** Called when the button is missing focus */
  onBlur: (event: FocusEvent) => void;
}>;

export type ButtonBaseProps = Partial<{
  /** Fill all available horizontal space */
  fluid: boolean;
  /** Disables button and makes it semi-transparent */
  disabled: boolean;
  /** Activates the button (gives it a green color) */
  selected: boolean;
  /** Changes button style */
  variant: 'filled' | 'transparent';
  /** A fancy, boxy tooltip, which appears when hovering over the button */
  tooltip: ButtonTooltip;
}> &
  ButtonInteractionProps &
  BoxProps;

export type ButtonIconProps = IconProps | IconNamesUnion;
export type ButtonProps = Partial<{
  /** Makes the button circular, with fixed ratio size 1:1 */
  circular: boolean;
  /** Adds an left side icon to the button */
  startIcon: ButtonIconProps;
  /** Adds an right side icon to the button */
  endIcon: ButtonIconProps;
}> &
  ButtonBaseProps;
