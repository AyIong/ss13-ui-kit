import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';
import { clamp } from 'tgui-modern/common/math';
import { Button } from 'tgui-modern/components/Button/index';
import { RestrictedInput } from 'tgui-modern/components/RestrictedInput/index';
import { Stack } from 'tgui-modern/components/Stack/index';
import { Tooltip } from 'tgui-modern/components/Tooltip/index';
import { TrackOutsideClicks } from 'tgui-modern/components/TrackOutsideClicks/index';
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

    function changeValue(changedValue: number) {
      const clampedNewValue = clamp(changedValue, minValue, maxValue);
      if (clampedNewValue !== value) {
        onChange(clampedNewValue);
      }
      setEditing(false);
    }

    return (
      <TrackOutsideClicks onOutsideClick={() => changeValue(newValue)}>
        <Stack style={{ pointerEvents: 'all' }}>
          <Button startIcon="angles-left" onClick={() => changeValue(minValue)} />
          <RestrictedInput
            autoSelect
            value={newValue}
            minValue={minValue}
            maxValue={maxValue}
            width={3}
            onChange={(value) => setNewValue(value)}
            onEnter={() => changeValue(newValue)}
          />

          <Button startIcon="angles-right" onClick={() => changeValue(maxValue)} />
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
