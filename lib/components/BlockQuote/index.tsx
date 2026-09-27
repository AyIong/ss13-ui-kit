import { colorClassName } from 'tgui-core/common/color';
import { classes } from 'tgui-core/common/react';
import { Box } from '../Box';
import type { BoxProps } from '../Box/types';

/**
 * ## BlockQuote
 *
 * Just a block quote, just like this example in markdown:
 * > Here's an example of a block quote.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-blockquote--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function BlockQuote(props: BoxProps) {
  const { className, color, ...rest } = props;

  return (
    <Box
      as="blockquote"
      className={classes('blockquote', className, colorClassName(color || 'label'))}
      {...rest}
    />
  );
}
