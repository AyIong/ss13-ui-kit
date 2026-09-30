import { classes } from 'tgui-modern/common/react';
import { Box } from '../Box';
import type { BoxProps } from '../Box/types';

/**
 * ## Dimmer
 *
 * Dims surrounding area to emphasize content placed inside.
 *
 * Content is automatically centered inside the dimmer.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-dimmer--docs)
 */
export function Dimmer(props: BoxProps) {
  const { className, children, ...rest } = props;

  return (
    <Box className={classes('dimmer', className)} {...rest}>
      {children}
    </Box>
  );
}
