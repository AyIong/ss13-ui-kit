import type { DraggableControlProps } from 'tgui-core/hooks/useDraggable/types';
import type { BoxProps } from '../Box/types';

export type NumberInputProps = Partial<{
  /** Color of the input. */
  color: string;
  /** Unit to display to the right of value. */
  unit: string;
  /**
   * Unlike other components, width uses character unit (ch) instead rem, em or px
   * And regulates min-width instead fixed width property.
   */
  width: number;
  /** Format value using this function before displaying it. */
  format: (value: number) => string;
}> &
  DraggableControlProps &
  BoxProps;
