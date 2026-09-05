import type { DraggableControlProps } from 'tgui-core/hooks/useDraggable/types';
import type { BoxProps } from '../Box/types';

export type SliderProps = Partial<{
  /** Color of the slider. */
  color: string;
  /**
   * If set, this value will be used to set the fill percentage of the
   * progress bar filler independently of the main value.
   */
  fillValue: number;
  /** Unit to display to the right of value. */
  unit: string;
  /**
   * Applies a `color` to the slider based on whether the value lands in the
   * range between `from` and `to`.
   */
  ranges: Record<string, [number, number]>;
  /** Format value using this function before displaying it. */
  format: (value: number) => string;
}> &
  DraggableControlProps &
  BoxProps;
