import type { BoxProps } from '../Box/types';

export type ColorBoxProps = {
  color: string;
  content?: string;
} & Omit<BoxProps, 'children'>;
