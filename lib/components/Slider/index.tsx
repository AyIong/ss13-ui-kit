import clsx from 'clsx';
import { useRef } from 'react';
import { colorClassName } from 'tgui-core/common/color';
import { keyOfMatchingRange } from 'tgui-core/common/math';
import { computeBoxProps, unit } from 'tgui-core/common/ui';
import { DraggableControl, useDraggable } from '../../hooks';
import { AnimatedNumber } from '../AnimatedNumber';
import { Tooltip } from '../Tooltip';
import type { SliderProps } from './types';

export function Slider(props: SliderProps) {
  const {
    // Draggable props (passthrough)
    vertical,
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
    size,
    format,
    fillValue,
    ranges,
    style,
    ...rest
  } = props;

  const draggableRef = useRef<HTMLDivElement>(null);
  const { percentage, displayValue, dragging, editing, setEditing } = useDraggable(draggableRef, {
    vertical,
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
          vertical && 'slider-vertical',
          dragging && 'dragging',
          disabled && 'disabled',
          className,
          colorClassName(effectiveColor),
        )}
        {...computeBoxProps({
          style: {
            '--int-percentage': percentage.internal,
            // Maked external same as internal while tickWhileDragging,
            // so we don't have weird "jumps".
            '--ext-percentage': tickWhileDragging ? percentage.internal : percentage.external,
            '--fill-value': fillValue && `${fillValue}%`,
            width: !vertical && unit(size),
            height: vertical && unit(size),
            ...style,
          },
          ...rest,
        })}
      >
        <div className="slider-fill">
          <div className="slider-fill--internal" />
          <div className="slider-fill--external" />
          <div className="slider-fill--cursor">
            <Tooltip
              isOpen={dragging}
              content={`${format ? formattedValue : displayValue}`}
              position="top"
            >
              <div className={clsx('slider-cursor', fillValue && 'always-visible')} />
            </Tooltip>
          </div>
        </div>
        <span className={clsx('slider-value', dragging && 'dragging')}>
          <AnimatedNumber value={value} format={format} />
          {props.unit}
        </span>
      </div>
    </DraggableControl>
  );
}
