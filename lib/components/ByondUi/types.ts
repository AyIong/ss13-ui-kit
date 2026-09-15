import type { BoxProps } from '../Box/types';

export type ByondUiProps = Partial<{
  /** An object with parameters, which are directly passed to
   * the `winset` proc call.
   *
   * You can find a full reference of these parameters
   * in [BYOND controls and parameters guide](https://secure.byond.com/docs/ref/skinparams.html). */
  params: SampleByondParams & Record<string, any>;

  /**
   * If this ByondUi element should tell DreamMaker that it has been created or not.
   *
   * Defaults to on.
   */
  phonehome: boolean;
}> &
  BoxProps;

export type ByondUiElement = {
  render: (params: Record<string, any>) => void;
  unmount: () => void;
};

export type BoundingBox = {
  pos: number[];
  size: number[];
};

export type SampleByondParams = Partial<{
  /** Can be auto-generated. */
  id: string;
  /**  Defaults to the current window */
  parent: string;
  /** The type of control. Read-only. */
  type: string;
  /** Text shown in label/button/input. For input controls this setting is only available at runtime. */
  text: string;
}>;
