import type { BooleanLike } from '@common/react';
import type {
  BooleanStyleMap,
  EventHandlers,
  StringStyleMap,
} from '@common/ui';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type BoxInternalProps = Partial<{
  /**
   * The component used for the root node.
   * @default <div>
   */
  as: string;
  /** The content of the component. */
  children: ReactNode;
  /** Class name to pass into the component. */
  className: string | BooleanLike;
  /** The unique id of the component. */
  id: string;
  /** The inline style of the component. */
  style: CSSProperties;
  /**
   * A shorthand classname syntax based loosely on tailwind.
   *
   * This takes all Box style props with a dash separator for params, e.g.'mb-4' or the prop name alone e.g. 'bold'.
   *
   * It's compatible with regular Box props, even on the same component, but it will take precedence.
   *
   * Example:
   * ```tsx
   * <Box tw="mb-2 bold fontSize-16px">
   *  // Is equivalent to
   * <Box mb={2} bold fontSize="16px">
   *  ```
   *
   * Caveats:
   * 1. You can't use this for custom props from other components.
   *
   * 2. There is no type info or safety for this method. Like the old days, it simply won't work if you use it incorrectly.
   *
   * 3. This should be a static string with minimal interpolation. If you need more logic, prefer the props approach.
   */
  tw: string;
}>;

type LiftedHTMLAttributes<TElement> = {
  /** Whether this element is draggable.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/draggable
   */
  draggable?: HTMLAttributes<TElement>['draggable'];
};

// Don't you dare put this elsewhere
export type DangerDoNotUse = {
  dangerouslySetInnerHTML?: {
    __html: any;
  };
};

// You may wonder why we don't just use ComponentProps<typeof Box> here.
// This is because I'm trying to isolate DangerDoNotUse from the rest of the props.
// While you still can technically use ComponentProps, it won't throw an error if someone uses dangerouslySet.
export interface BoxProps<TElement = HTMLDivElement>
  extends BoxInternalProps,
    BooleanStyleMap,
    StringStyleMap,
    LiftedHTMLAttributes<TElement>,
    EventHandlers<TElement> {}
