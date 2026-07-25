import { Modal } from '../Modal';
import type { ModalProps } from '../Modal/types';

/**
 * ## Dialog
 *
 * @deprecated Use [Modal](https://tgstation.github.io/tgui-core/?path=/docs/components-modal--docs)
 * component instead.
 */
export function Dialog(props: ModalProps) {
  const { children, ...rest } = props;
  return <Modal {...rest}>{children}</Modal>;
}
