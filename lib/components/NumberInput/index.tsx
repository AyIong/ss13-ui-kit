import clsx from 'clsx';
import { useRef } from 'react';
import { computeBoxProps } from 'tgui-core/common/ui';
import { DraggableControl, useDraggable } from 'tgui-core/hooks/index';
import { AnimatedNumber } from '../AnimatedNumber';
import type { NumberInputProps } from './types';

export function NumberInput(props: NumberInputProps) {
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
    color,
    unit,
    width,
    format,
    ...rest
  } = props;

  const draggableRef = useRef<HTMLDivElement>(null);
  const { percentage, displayValue, dragging, editing, setEditing } = useDraggable(draggableRef, {
    vertical: true,
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
          'numberinput',
          `bg-${color || 'primary'}`,
          disabled && 'disabled',
          className,
        )}
        {...computeBoxProps({
          style: {
            '--width': width && `${width}ch`,
            '--percentage': percentage.internal,
          },
          ...rest,
        })}
      >
        <div className="numberinput-bar">
          <div className={clsx('numberinput-bar--fill', dragging && 'dragging')} />
          <div className="numberinput-bar--placeholder" />
        </div>
        <span className="numberinput-value">
          {dragging ? formattedValue : <AnimatedNumber value={displayValue} format={format} />}
          {unit}
        </span>
      </div>
    </DraggableControl>
  );
}
