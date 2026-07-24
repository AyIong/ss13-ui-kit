import type { ReactNode } from 'react';

export type DialogProps = {
  /** The title of the dialog. */
  title: ReactNode;
  /** The content of the dialog. */
  children: ReactNode;
  /** Whether the Dialog is open */
  isOpen: boolean;
  /** The function to call when close is clicked */
  onClose: () => void;
} & Partial<{
  /** The height of the dialog. */
  height: string;
  /** The width of the dialog. */
  width: string;
}>;
