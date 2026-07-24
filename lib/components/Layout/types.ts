import type { ComponentPropsWithRef } from 'react';
import type { BoxProps } from '../Box/types';

export type LayoutProps = Partial<{
  /**
   * Preferenced components theme. Must be implemented as preference,
   * to be real functional
   */
  colorScheme: 'day' | 'night';
  // Components thematic style. List available on [tgui-core](https://github.com/tgstation/tgui-core/tree/main/styles/themes) repo
  theme: string;
}> &
  BoxProps &
  ComponentPropsWithRef<'div'>;
