import type { ReactNode } from 'react';

export type DialogProps = {
  /** The content of the dialog. */
  children: ReactNode;
  /** The title of the dialog. */
  title: ReactNode;
  /** Whether the Dialog is open */
  isOpen: boolean;
} & Partial<{
  /** The height of the dialog. */
  height: string;
  /** The width of the dialog. */
  width: string;
  /**
   * The function to call when close is clicked.
   * If not present, closing button must be added manually,
   * also close on click outside will not work.
   */
  onClose: () => void;
}>;
