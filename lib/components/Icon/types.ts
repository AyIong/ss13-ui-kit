import type { BooleanLike } from '@common/react';
import type { BoxProps } from '@components';

export type IconProps = {
  /** Icon name. @see https://fontawesome.com/v6/search?o=r&m=free */
  name: string;
} & Partial<{
  /** Icon rotation, in degrees. */
  rotation: number;
  /** Icon size. `1` is normal size, `2` is two times bigger. Fractional numbers are supported. */
  size: number;
  /** Whether an icon should be spinning. Good for load indicators. */
  spin: BooleanLike;
}> &
  Omit<BoxProps, 'children'>;

export type IconStackProps = {
    /** Works same as `Icon` size prop, but for all icons inside. */
    size?: number;
  } & BoxProps;
