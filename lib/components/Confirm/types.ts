import type { ReactNode } from 'react';
import type { ButtonIconProps, ButtonProps } from '../Button/types';

export type ConfirmProps = {
  /**
   * Time in ms for which button must be held before the action occurs.
   * Default is 1000 (1 second)
   */
  confirmDelay: number;
  /** Icon that will be showed after confirmation */
  confirmedIcon: ButtonIconProps;
  /** Content which will be displayed after confirmation */
  confirmedContent: ReactNode;
} & Omit<ButtonProps, 'selected' | 'endIcon'>;
