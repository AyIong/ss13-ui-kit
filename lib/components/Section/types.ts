import type { BoxProps } from '@components';
import type { PropsWithChildren, ReactNode, RefObject } from 'react';

export type SectionProps = Partial<{
  /** Buttons to render aside the section title. */
  buttons: ReactNode;
  /** id to assosiate with the parent div element used by this section, for uses with procs like getElementByID */
  container_id: string;
  /** If true, fills all available vertical space. */
  fill: boolean;
  /** If true, removes all section padding. */
  fitted: boolean;
  /** If true, fills the area without forcing height to 100% */
  flexGrow: boolean;
  /** If true, removes the section top padding */
  noTopPadding: boolean;
  /** @member Callback function for the `scroll` event */
  onScroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  /** Shows or hides the scrollbar. */
  scrollable: boolean;
  /** @deprecated Shows or hides the horizontal scrollbar. */
  scrollableHorizontal: boolean;
  /** If true, filly the area except for -3rem */
  stretchContents: boolean;
  /** Title of the section. */
  title: ReactNode;
  /** Ref to the section element. */
  ref: RefObject<HTMLDivElement | null>;
}> & PropsWithChildren &
  BoxProps;
