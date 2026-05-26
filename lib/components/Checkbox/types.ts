import type { ButtonBaseProps } from '../Button/types';

export type CheckboxProps = Partial<{
  checked: boolean;
}> &
  Omit<ButtonBaseProps, 'selected' | 'variant'>;
