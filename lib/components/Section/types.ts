import type { BoxProps } from '@components';
import type { ReactNode } from 'react';

export type SectionProps = Partial<{
  /** Buttons to render aside the section title. */
  buttons: ReactNode;
  /** id to assosiate with the parent div element used by this section, for uses with procs like getElementByID */
  containerId: string;
  /** If true, fills all available vertical space. */
  fill: boolean;
  /** If true, removes all section padding. */
  fitted: boolean;
  /** If true, removes the section top padding */
  noTopPadding: boolean;
  /** @member Callback function for the `scroll` event */
  onScroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  /** Shows or hides the scrollbar. */
  scrollable: boolean;
  /** Title of the section. */
  title: ReactNode;
}> &
  BoxProps;
