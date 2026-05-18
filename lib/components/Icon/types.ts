import type { BoxProps } from '@components';
import type {  IconName } from '@fortawesome/fontawesome-svg-core';
import type { AnimationProps, CSSVariables } from '@fortawesome/react-fontawesome';
import type { CSSProperties } from 'react';


export type IconNamesUnion = IconName | CustomIconName;

type CustomIconName = 'nanotrasen';

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
  /** CSS styles and FontAwesome variables */
  style: CSSProperties & CSSVariables;
}> & AnimationProps &
  Omit<BoxProps, 'children'>;

export type IconStackProps = {
  /** Works same as `Icon` size prop, but for all icons inside. */
  size?: number;
} & BoxProps;

