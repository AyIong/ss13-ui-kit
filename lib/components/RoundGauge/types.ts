import type { BoxProps } from '../Box/types';

export type RoundGaugeProps = {
  /** The current value of the metric. */
  value: number;
} & Partial<{
  /** When provided, will cause an alert symbol on the gauge to begin flashing in the color upon which the needle currently rests, as defined in `ranges`. */
  alertAfter: number;
  /** As with alertAfter, but alerts below a value. If both are set, and alertAfter comes earlier, the alert will only flash when the needle is between both values. Otherwise, the alert will flash when on the active side of either threshold. */
  alertBefore: number;
  /** CSS style. */
  className: string;
  /** When provided, will be used to format the value of the metric for display. */
  format: (value: number) => string;
  /** The upper bound of the gauge. */
  maxValue: number;
  /** The lower bound of the gauge. */
  minValue: number;
  /** Provide regions of the gauge to color between two specified values of the metric. */
  ranges: Record<string, [number, number]>;
  /** When provided scales the gauge. */
  size: number;
}> &
  BoxProps;
