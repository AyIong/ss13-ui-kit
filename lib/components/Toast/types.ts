import type { ReactNode } from 'react';
import type { CssColors } from 'tgui-core/common/constants';
import type { IconProps } from '../Icon/types';

export type ToastProps = Partial<{
  /** Toast class for CSS customization */
  className: string;
  /** Toast accent color */
  color: CssColors;
  /** Bold text on top */
  title: ReactNode;
  /** Content under title */
  content: ReactNode;
  /** Additional buttons inside toast */
  buttons: ReactNode;
  /** Any FontAwesome icon */
  icon: IconProps;
  /** Determies how long toast will be visible, until auto-dismiss in ms. */
  duration: number;
}>;
