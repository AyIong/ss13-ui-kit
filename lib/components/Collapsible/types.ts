import type { PropsWithChildren, ReactNode } from 'react';
import type { BoxProps } from '../Box/types';
import type { IconNamesUnion, IconProps } from '../Icon/types';

type CollapsibleIconProps = IconProps | IconNamesUnion;
export type CollapsibleProps = Partial<{
  /** Buttons or other content to render inline with the button */
  buttons: ReactNode;
  /** Icon to display with the collapsible */
  startIcon: CollapsibleIconProps;
  /** Additional icon to display after collapsible title content */
  endIcon: CollapsibleIconProps;
  /** Whether the collapsible is open */
  open: boolean;
  /** Text to display on the button for collapsing */
  title: ReactNode;
}> &
  BoxProps &
  PropsWithChildren;

export type CollapsibleContentProps = {
  isOpen: boolean;
} & PropsWithChildren;
