import type { ComponentPropsWithRef } from 'react';
import type { BoxProps } from '../Box/types';

export type LayoutProps = Partial<{
  theme: string;
}> & BoxProps &
  ComponentPropsWithRef<'div'>;
