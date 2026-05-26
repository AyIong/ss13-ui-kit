import type { BoxProps } from '@components';
import type { IconName } from '@fortawesome/fontawesome-common-types';
import type { CSSProperties } from 'react';
import type { CustomIconName } from './icons';

export type IconNamesUnion = IconName | CustomIconName;

export type IconProps = {
  /** Icon name. @see https://fontawesome.com/v7/search?o=r&m=free */
  name: IconNamesUnion;
} & Partial<{
  /** Whether to use regular (outline) style. Less icons available. */
  regular: boolean;
  /** Icon size. `1` is normal size, `2` is two times bigger. Fractional numbers are supported. */
  size: number;
  /** Icon rotation, in degrees. */
  rotation: number;
  /** FontAwesome animations */
  animation:
    | 'beat'
    | 'beat-fade'
    | 'bounce'
    | 'fade'
    | 'shake'
    | 'spin'
    | 'spin-pulse';
  /** CSS styles and FontAwesome variables */
  style: CSSProperties;
}> &
  Omit<BoxProps, 'children'>;

export type IconStackProps = {
  /** Works same as `Icon` size prop, but for all icons inside. */
  size?: number;
} & BoxProps;
