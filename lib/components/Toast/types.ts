import type { ReactNode } from 'react';
import type { CssColors } from 'tgui-core/common/constants';
import type { IconProps } from '../Icon/types';

export type ToastProps = {
  /** Bold text on top */
  title: ReactNode;
} & Partial<{
  /** Content under title */
  content: ReactNode;
  /** Any FontAwesome icon */
  icon: IconProps;
  /** Toast accent color */
  color: CssColors;
  /** Additional buttons inside toast */
  buttons: ReactNode;
  /** Toast class for CSS customization */
  className: string;
  /**
   * Determies how long toast will be visible,
   * until auto-dismiss in ms.
   * Defauilt is 5000 - 5s
   */
  duration: number;
}>;
