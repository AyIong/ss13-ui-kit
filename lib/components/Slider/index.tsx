import clsx from 'clsx';
import { useRef } from 'react';
import { keyOfMatchingRange } from 'tgui-core/common/math';
import { computeBoxProps } from 'tgui-core/common/ui';
import { DraggableControl, useDraggable } from '../../hooks';
import { AnimatedNumber } from '../AnimatedNumber';
import { Tooltip } from '../Tooltip';
import type { SliderProps } from './types';

export function Slider(props: SliderProps) {
  const {
    // Draggable props (passthrough)
    value,
    minValue,
    maxValue,
    disabled,
    step,
    tickWhileDragging,
    onChange,
    // Own props
    className,
    color,
    unit,
    format,
    fillValue,
    ranges,
    ...rest
  } = props;

  const draggableRef = useRef<HTMLDivElement>(null);
  const { percentage, displayValue, dragging, editing, setEditing } = useDraggable(draggableRef, {
    value,
    minValue,
    maxValue,
    disabled,
    step,
    tickWhileDragging,
    onChange,
  });
  const formattedValue = format ? format(displayValue) : displayValue;
  const effectiveColor = color || (ranges && keyOfMatchingRange(fillValue || displayValue, ranges));

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
          'slider',
          `bg-${effectiveColor || 'primary'}`,
          dragging && 'dragging',
          disabled && 'disabled',
          className,
        )}
        {...computeBoxProps({
          style: {
            '--int-percentage': percentage.internal,
            // Maked external same as internal while tickWhileDragging,
            // so we don't have weird "jumps.
            '--ext-percentage': tickWhileDragging ? percentage.internal : percentage.external,
            '--fill-value': fillValue && `${fillValue}%`,
          },
          ...rest,
        })}
      >
        <div className="slider-fill">
          <div className="slider-fill--internal" />
          <div className="slider-fill--external" />
          <div className="slider-fill--cursor">
            <Tooltip isOpen={dragging} content={`${displayValue}`} position="top">
              <div className={clsx('slider-cursor', fillValue && 'always-visible')} />
            </Tooltip>
          </div>
        </div>
        <span className={clsx('slider-value', dragging && 'dragging')}>
          <AnimatedNumber value={value} format={format} />
          {unit}
        </span>
      </div>
    </DraggableControl>
  );
}
