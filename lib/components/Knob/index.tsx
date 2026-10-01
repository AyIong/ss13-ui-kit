import { useRef } from 'react';
import { colorClassName } from 'tgui-modern/common/color';
import { keyOfMatchingRange, scale } from 'tgui-modern/common/math';
import { classes } from 'tgui-modern/common/react';
import { computeBoxProps } from 'tgui-modern/common/ui';
import { DraggableControl } from 'tgui-modern/hooks/useDraggable/DraggableControl';
import { useDraggable } from 'tgui-modern/hooks/useDraggable/index';
import { Tooltip } from '../Tooltip';
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
        className={classes(
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
        <Tooltip
          isOpen={dragging}
          content={`${format ? formattedValue : displayValue}`}
          position="bottom"
        >
          <div className="knob-circle">
            <div className="knob-cursor--wrapper">
              <div className="knob-cursor" />
            </div>
          </div>
        </Tooltip>
        <svg className="knob-ring" viewBox="0 0 100 100">
          <circle className="knob-ring--placeholder" />
          <circle className="knob-ring--fill" />
        </svg>
      </div>
    </DraggableControl>
  );
}
