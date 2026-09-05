import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';
import { clamp } from 'tgui-core/common/math';
import { Button, RestrictedInput, Stack, Tooltip } from 'tgui-core/components/index';
import { TrackOutsideClicks } from 'tgui-core/components/TrackOutsideClicks/index';
import type { DraggableControlProps } from './types';

type Props = {
  editing: boolean;
  children: ReactNode;
  setEditing: Dispatch<SetStateAction<boolean>>;
} & DraggableControlProps;
export function DraggableControl(props: Props) {
  const { children, editing, value, minValue, maxValue, setEditing, onChange } = props;

  function Controls() {
    const [newValue, setNewValue] = useState<number>(value);
    const clampedNewValue = clamp(newValue, minValue, maxValue);

    return (
      <TrackOutsideClicks
        onOutsideClick={() => {
          onChange(clampedNewValue);
          setEditing(false);
        }}
      >
        <Stack style={{ pointerEvents: 'all' }}>
          <Button
            startIcon="angles-left"
            onClick={() => {
              setNewValue(minValue);
              onChange(minValue);
            }}
          />
          <RestrictedInput
            autoSelect
            value={newValue}
            minValue={minValue}
            maxValue={maxValue}
            width={3}
            onChange={(value) => setNewValue(value)}
            onEnter={() => onChange(clampedNewValue)}
          />

          <Button
            startIcon="angles-right"
            onClick={() => {
              setNewValue(maxValue);
              onChange(maxValue);
            }}
          />
        </Stack>
      </TrackOutsideClicks>
    );
  }

  return (
    <Tooltip isOpen={editing} content={<Controls />}>
      {children}
    </Tooltip>
  );
}
