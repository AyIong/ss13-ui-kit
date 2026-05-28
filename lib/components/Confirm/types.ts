import type { ReactNode } from 'react';
import type { ButtonProps } from '../Button/types';
import type { IconProps } from '../Icon/types';

export type ConfirmProps = {
  /** Content that will be visible until confirmation */
  confirmContent: ReactNode;
  /** Color that will be applied until confirmation */
  confirmColor: string;
  /** Icon that will be showed until confirmation */
  confirmIcon: IconProps;
} & Omit<ButtonProps, 'selected' | 'endIcon'>;
