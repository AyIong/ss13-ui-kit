import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import type { BoxProps } from '../Box/types';
import type { IconProps } from '../Icon/types';

export type CollapsibleProps = Partial<{
  /** Buttons or other content to render inline with the button */
  buttons: ReactNode;
  /** Icon to display with the collapsible */
  icon: IconProps;
  /** Whether the collapsible is open */
  open: boolean;
  /** Text to display on the button for collapsing */
  title: ReactNode;
  /** Custom styles for the child nodes */
  childrenStyles: CSSProperties;
}> &
  BoxProps &
  PropsWithChildren;

export type CollapsibleContentProps = {
  isOpen: boolean;
  childrenStyles?: CSSProperties;
} & PropsWithChildren;
