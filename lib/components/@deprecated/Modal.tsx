import { Dialog } from '../Dialog';
import type { DialogProps } from '../Dialog/types';

/**
 * ## Modal
 *
 * @deprecated Use [Dialog](https://tgstation.github.io/tgui-core/?path=/docs/components-dialog--docs)
 * component instead.
 */
export function Modal(props: DialogProps) {
  const { children, ...rest } = props;
  return <Dialog {...rest}>{children}</Dialog>;
}
