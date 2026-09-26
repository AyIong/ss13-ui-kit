import type { BoxProps } from '@components';
import type { ReactNode } from 'react';

export type SectionProps = Partial<{
  /** If true, fills all available vertical space. */
  fill: boolean;
  /** Shows or hides the scrollbar. */
  scrollable: boolean;
  /** Title of the section. */
  title: ReactNode;
  /** Buttons to render aside the section title. */
  buttons: ReactNode;
  /** If true, removes all section padding. */
  fitted: boolean;
  /** If true, removes the section top padding */
  noTopPadding: boolean;
  /** id to assosiate with the parent div element used by this section, for uses with procs like getElementByID */
  containerId: string;
  /** @member Callback function for the `scroll` event */
  onScroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
}> &
  BoxProps &
  StyleableProps;

type StyleableProps =
  | {
      /**
       * Resets the section default styles, allowing you to
       * define them yourself using CSS.
       * It will not reset layout styles.
       * Used only in conjunction with className!
       */
      styleable: true;
      className: string;
    }
  | {
      styleable?: false | undefined;
      className?: string;
    };
