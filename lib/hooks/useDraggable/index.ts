import { useThrottle } from '@uidotdev/usehooks';
import { type RefObject, useEffect, useRef, useState } from 'react';
import { draggingClassName } from 'tgui-core/common/constants';
import { KEY } from 'tgui-core/common/keys';
import { clamp01, scale } from 'tgui-core/common/math';
import type { ContainerSize, CursorPosition, UseDraggable, UseDraggableProps } from './types';

function clampToStep(rawValue: number, minValue: number, maxValue: number, step: number) {
  const stepped = Math.round(rawValue / step) * step;
  return Math.min(maxValue, Math.max(minValue, stepped));
}

export function useDraggable(
  draggableRef: RefObject<HTMLDivElement | null>,
  props: UseDraggableProps,
): UseDraggable {
  const {
    value,
    minValue,
    maxValue,
    vertical,
    step,
    sensitivity,
    disabled,
    tickWhileDragging,
    onChange,
  } = props;
  /** Minimal accepted for dynamic sensitivity size */
  const minSize = 50;
  /** Interval at which onChange will be called if tickWhileDragging is true */
  const defaultUpdateRate = 400;

  const containerSizes = useRef<ContainerSize | null>(null);
  const dragStart = useRef<CursorPosition>(null);
  const startValue = useRef<number>(value);
  const currentValue = useRef<number>(value);

  const [dragging, setDragging] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [displayValue, setDisplayValue] = useState<number>(value);

  const throttledValue = useThrottle(displayValue, defaultUpdateRate);
  const internalPercentage = `${clamp01(scale(displayValue, minValue, maxValue)) * 100}%`;
  const externalPercentage = `${clamp01(scale(value, minValue, maxValue)) * 100}%`;

  function calculateContainerSizes(recalculate?: boolean) {
    if (!draggableRef?.current) {
      return;
    }

    if (containerSizes.current !== null && !recalculate) {
      return;
    }

    const rect = draggableRef.current.getBoundingClientRect();
    containerSizes.current = { width: rect.width, height: rect.height };
  }

  function getEffectiveSize(): number {
    calculateContainerSizes();

    const sizes = containerSizes.current;
    const orientationSize = vertical ? sizes?.height : sizes?.width;
    if (!orientationSize || orientationSize < minSize) {
      return minSize;
    }

    return orientationSize;
  }

  /**
   * Preparing to drag.
   * The actual dragging doesn't begin here, as we have
   * editing mode which depends on full click.
   * It's also much more reliable this way.
   */
  function handleMouseDown(event: MouseEvent) {
    if (disabled) {
      return;
    }

    dragStart.current = { posX: event.clientX, posY: event.clientY };
    startValue.current = value;
  }

  /**
   * Start dragging on first mouse move.
   * Adds the appropriate class to the document and changes the dragging state.
   * All main calculations done there
   */
  function handleMouseMove(event: MouseEvent) {
    if (disabled || !dragStart.current) {
      return;
    }

    if (editing) {
      setEditing(false); // We don't need both
    }

    if (!dragging) {
      setDragging(true);
      document.documentElement.classList.add(draggingClassName);
    }

    const deltaX = event.clientX - dragStart.current.posX;
    const deltaY = event.clientY - dragStart.current.posY;
    const rawDelta = vertical ? -deltaY : deltaX;

    const size = getEffectiveSize();
    const range = maxValue - minValue;
    const stepValue = step ? step : 1;

    const deltaValue = (rawDelta / size) * range * (sensitivity || 1);
    const nextValue = clampToStep(startValue.current + deltaValue, minValue, maxValue, stepValue);

    currentValue.current = nextValue;
    setDisplayValue(nextValue);
  }

  /**
   * Remove dragging state and class from document,
   * and send new value.
   */
  function handleMouseUp() {
    if (dragStart.current !== null) {
      dragStart.current = null; // Reset it anyway, or handleDragMove may not work
    }

    if (disabled || !dragging) {
      return;
    }

    setDragging(false);
    document.documentElement.classList.remove(draggingClassName);

    if (currentValue.current !== value) {
      onChange(currentValue.current);
    }
  }

  /** Enables editing mod on click. */
  function handleClick() {
    if (!disabled && (!dragging || !editing)) {
      setEditing(true);
    }
  }

  /** Reset editing on enter or escape buttons press */
  function handleKeyDown(event: KeyboardEvent) {
    if (!editing) {
      return;
    }

    if (event.key === KEY.Escape || event.key === KEY.Enter) {
      setEditing(false);
    }
  }

  /**
   * Call onChange every defaultUpdateRate interval time,
   * when tickWhileDragging is true
   */
  useEffect(() => {
    if (value !== throttledValue && tickWhileDragging) {
      onChange(throttledValue);
    }
  }, [throttledValue]);

  /** Update internal value on external change */
  useEffect(() => {
    if (!dragging) {
      currentValue.current = value;
      setDisplayValue(value);
    }
  }, [value, dragging]);

  /** Attach event listeners and remove them on unmount  */
  useEffect(() => {
    if (!draggableRef.current) {
      return;
    }

    draggableRef.current.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    draggableRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      draggableRef.current?.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);

      draggableRef.current?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [value, dragging, editing, disabled]);

  /** Sizes calculation and recalculations if they change */
  useEffect(() => {
    calculateContainerSizes();

    if (!draggableRef?.current) {
      return;
    }

    const observer = new ResizeObserver(() => calculateContainerSizes(true));
    observer.observe(draggableRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    percentage: { internal: internalPercentage, external: externalPercentage },
    displayValue,
    dragging,
    editing,
    setEditing,
  };
}
