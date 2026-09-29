import type { BoxProps } from '../Box/types';
import type { AnimationName, CustomIconName, RegularIconName, SolidIconName } from './icons';

export type IconNamesUnion = SolidIconName | RegularIconName | CustomIconName;
export type IconProps = {
  /** Icon name. @see https://fontawesome.com/v7/search?o=r&m=free */
  name: IconNamesUnion;
} & Partial<{
  /** Icon size. `1` is normal size, `2` is two times bigger. Fractional numbers are supported. */
  size: number;
  /** Icon rotation, in degrees. */
  rotation: number;
  /** FontAwesome animations */
  animation: AnimationName;
}> &
  Omit<BoxProps, 'children'>;

export type IconStackProps = {
  /** Works same as `Icon` size prop, but for all icons inside. */
  size?: number;
} & BoxProps;
