import type { TextInputProps } from '../Input/types';

export type RestrictedInputProps = BaseRestrictedInputProps &
  TextInputProps<HTMLInputElement, number>;

type BaseRestrictedInputProps = Partial<{
  /** Restricted inputs round by default.  */
  allowFloats: boolean;
  /** Max value. 10,000 by default. */
  maxValue: number;
  /** Min value. 0 by default. */
  minValue: number;
  /** Fires on input validation change */
  onValidationChange: (isValid: boolean) => void;
}>;
