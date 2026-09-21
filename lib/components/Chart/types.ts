import type { CssColors } from 'tgui-core/common/constants';
import type { BoxProps } from '../Box/types';

export type ChartProps = Partial<{
  // Make Chart container flexible and allow it to fill all available width
  fluid: boolean;
}> &
  BoxProps;

export type ChartLineProps = {
  data: number[][];
} & Partial<{
  /** Chages component color palette */
  color: CssColors;
  rangeX: [number, number];
  rangeY: [number, number];
  strokeWidth: number;
}> &
  BoxProps;

export type Point = number[];
export type Range = [number, number];
export type ViewBox = [number, number];
