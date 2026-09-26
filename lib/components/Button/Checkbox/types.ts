import type { ButtonBaseProps } from '../types';

export type CheckboxProps = Partial<{
  checked: boolean;
}> &
  Omit<ButtonBaseProps, 'selected' | 'variant'>;
