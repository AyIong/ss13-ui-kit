import type { BoxProps } from '../Box/types';

export type ChartProps = Partial<{
  // Make Chart container flexible and allow it to fill all available width
  fluid: boolean;
}> &
  BoxProps;

export type ChartLineProps = {
  data: number[][];
} & Partial<{
  fillColor: string;
  rangeX: [number, number];
  rangeY: [number, number];
  strokeColor: string;
  strokeWidth: number;
}> &
  BoxProps;

export type Point = number[];
export type Range = [number, number];
export type ViewBox = [number, number];
