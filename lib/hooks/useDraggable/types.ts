import type { Dispatch, SetStateAction } from 'react';

export type ContainerSize = {
  width: number;
  height: number;
};

export type CursorPosition = {
  posX: number;
  posY: number;
};

export type DraggableControlValuesProps = {
  /** Value itself, controls the position of the cursor. */
  value: number;
  /** Lowest possible value. */
  minValue: number;
  /** Highest possible value. */
  maxValue: number;
  /**
   * An event which fires when you release the slider or enter a number. This is
   * the default value event for controls.
   */
  onChange: (value: number, event?: Event) => void;
};

export type DraggableControlProps = Partial<{
  /** When true, any interactions will be blocked */
  disabled: boolean;
  /** Step at which the value will change */
  step: number;
  /** The higher the value, the more sensitive the draggable is to mouse movements. */
  sensitivity: number;
  /** onChange also fires when you drag the input. */
  tickWhileDragging: boolean;
}> &
  DraggableControlValuesProps;

export type UseDraggableProps = Partial<{
  /** Changes dragging from horizontal to vertical */
  vertical: boolean;
}> &
  DraggableControlProps;

export type UseDraggable = {
  /** Calculated fill values in percents */
  percentage: { internal: string; external: string };
  /** Internal calculated value to display */
  displayValue: number;
  /** Determines whether the user dragging or not */
  dragging: boolean;
  /** Determines whether the user editing or not */
  editing: boolean;
  /** Allows to change editing state externally  */
  setEditing: Dispatch<SetStateAction<boolean>>;
};
