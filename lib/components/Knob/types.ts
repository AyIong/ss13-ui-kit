import type { DraggableControlProps } from 'tgui-core/hooks/useDraggable/types';
import type { BoxProps } from '../Box/types';

export type KnobProps = Partial<{
  /** Knob can be bipolar or unipolar. */
  bipolar: boolean;
  /** Color of the knob. */
  color: string;
  /**
   * Relative size of the knob. `1` is normal size, `2` is two times bigger.
   * Fractional numbers are supported.
   */
  size: number;
  /**
   * If set, this value will be used to set the fill percentage of the
   * progress bar filler independently of the main value.
   */
  fillValue: number;
  /** Unit to display on the bottom of value. */
  unit: string;
  /**
   * Applies a `color` to the knob based on whether the value lands in the
   * range between `from` and `to`.
   */
  ranges: Record<string, [number, number]>;
  /** Format value using this function before displaying it. */
  format: (value: number) => string;
}> &
  DraggableControlProps &
  BoxProps;
