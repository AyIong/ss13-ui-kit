import clsx from 'clsx';
import { useRef } from 'react';
import { colorClassName } from 'tgui-core/common/color';
import { keyOfMatchingRange, scale } from 'tgui-core/common/math';
import { computeBoxProps } from 'tgui-core/common/ui';
import { DraggableControl, useDraggable } from '../../hooks';
import { AnimatedNumber } from '../AnimatedNumber';
import type { KnobProps } from './types';

export function Knob(props: KnobProps) {
  const {
    // Draggable props (passthrough)
    value,
    minValue,
    maxValue,
    disabled,
    step,
    sensitivity,
    tickWhileDragging,
    onChange,
    // Own props
    className,
    bipolar,
    color,
    size,
    unit,
    format,
    fillValue,
    ranges,
    style,
    ...rest
  } = props;

  const draggableRef = useRef<HTMLDivElement>(null);
  const { displayValue, dragging, editing, setEditing } = useDraggable(draggableRef, {
    value,
    minValue,
    maxValue,
    disabled,
    step,
    sensitivity,
    tickWhileDragging,
    onChange,
  });
  const formattedValue = format ? format(displayValue) : displayValue;
  const effectiveColor = color || (ranges && keyOfMatchingRange(fillValue || displayValue, ranges));
  const scaledDisplayValue = scale(displayValue, minValue, maxValue);

  return (
    <DraggableControl
      editing={editing}
      setEditing={setEditing}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      onChange={onChange}
    >
      <div
        ref={draggableRef}
        className={clsx(
          'knob',
          bipolar && 'bipolar',
          dragging && 'dragging',
          disabled && 'disabled',
          className,
          colorClassName(effectiveColor),
        )}
        {...computeBoxProps({
          style: {
            '--size': size || 1,
            '--scaled-value': scaledDisplayValue,
            ...style,
          },
          ...rest,
        })}
      >
        <div className="knob-circle">
          <div className="knob-cursor--wrapper">
            <div className="knob-cursor" />
          </div>
          <div className="knob-value">
            {dragging ? formattedValue : <AnimatedNumber value={displayValue} format={format} />}
          </div>
        </div>
        <svg className="knob-ring" viewBox="0 0 100 100">
          <circle className="knob-ring--placeholder" />
          <circle className="knob-ring--fill" />
        </svg>
      </div>
    </DraggableControl>
  );
}
