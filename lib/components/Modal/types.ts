import type { ReactNode } from 'react';

export type ModalProps = {
  /** The content of the modal. */
  children: ReactNode;
  /** Whether the Modal is open */
  isOpen: boolean;
} & Partial<{
  /** The title of the modal. */
  title: ReactNode;
  /** The height of the modal. */
  height: string;
  /** The width of the modal. */
  width: string;
  /**
   * The function to call when close is clicked.
   * If not present, closing button must be added manually,
   * also close on click outside will not work.
   */
  onClose: () => void;
  /** Fires once the enter key is pressed */
  onEnter: (event: KeyboardEvent) => void;
}>;
