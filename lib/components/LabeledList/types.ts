import type { ReactNode } from 'react';
import type { TooltipContentProps } from '../Tooltip/types';

export type LabeledListItemProps = Partial<{
  /** Buttons to render aside the content. */
  buttons: ReactNode;
  /** Content of this labeled item. */
  children: ReactNode;
  /** Applies a CSS class to the element. */
  className: string;
  /** Sets the color of the content text. */
  color: string;
  /** @deprecated */
  content: any;
  /**
   * Sometimes this does not properly register in TS.
   * See [react key docs](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) for more info.
   */
  key: string | number;
  /** Item label. Appends a colon at the end. */
  label: ReactNode;
  /** Sets the color of the label. */
  labelColor: string;
  /** Lets the label wrap and makes it not take the minimum width. */
  labelWrap: boolean;
  /**
   * Align the content text.
   *
   * - `left` (default)
   * - `center`
   * - `right`
   */
  textAlign: string;
  /** A fancy, boxy tooltip, which appears when hovering over the label */
  tooltip: TooltipContentProps;
  /**
   * Align both the label and the content vertically.
   *
   * - `baseline` (default)
   * - `top`
   * - `middle`
   * - `bottom`
   */
  verticalAlign: string;
  /** Preserves line-breaks and spacing in Labeled.Item text. */
  preserveWhitespace: boolean;
}>;
