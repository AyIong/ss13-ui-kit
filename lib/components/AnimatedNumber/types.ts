export type AnimatedNumberProps = {
  /** The target value to approach. */
  value: number;
} & Partial<{
  /**
   * If provided, a function that formats the inner string. By default,
   * attempts to match the numeric precision of `value`.
   */
  format: (value: number) => string;
  /**
   * If provided, the initial value displayed. By default, the same as `value`.
   * If `initial` and `value` are different, the component immediately starts
   * animating.
   */
  initial: number;
}>;
