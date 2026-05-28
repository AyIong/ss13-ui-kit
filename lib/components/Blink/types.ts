import type { ReactNode } from 'react';

export type BlinkProps = {
  /** Things that blink! */
  children: ReactNode;
} & Partial<{
  /** The time to wait before blinking again, in milliseconds.  */
  time: number;
  /** The interval between blinks, in milliseconds. */
  interval: number;
}>;
