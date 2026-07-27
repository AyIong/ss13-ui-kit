import clsx from 'clsx';
import { type CSSProperties, useLayoutEffect, useState } from 'react';
import { unit } from 'ss13-ui-kit/common/ui';
import { useButton } from 'ss13-ui-kit/hooks/useButton';
import { useScrollable } from 'ss13-ui-kit/hooks/useScrollable';
import { Input } from '../Input';
import {
  entryClassName,
  getOptionDisplayText,
  getOptionValue,
  getSelectedIndex,
  maxItemsDefault,
  maxItemsLimit,
} from './helpers';
import type { DropdownMenuEntryProps, DropdownMenuProps } from './types';

export function DropdownMenu(props: DropdownMenuProps) {
  const { ref, color, options, maxItems, selected, onSelected } = props;

  const isEmpty = options.length === 0;
  const selectedIndex = getSelectedIndex(options, selected);
  const [entryHeight, setEntryHeight] = useState<number>(2000); // 20 is fallback

  // Initialize scrollbar
  useScrollable(ref);
  // Calculate entry height, to use it for maxHeight
  useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const entryElement = ref.current.querySelector(`.${entryClassName}`);
    const entrySize = entryElement?.getBoundingClientRect().height;
    if (entrySize) {
      setEntryHeight(entrySize);
    }
  }, [options]);

  // Get max height, depend on maxItems and entryHeight
  // By default, returns 10 * ~20 (~200px)
  function getMaxHeight() {
    if (!maxItems) {
      return maxItemsDefault * entryHeight;
    }
    return Math.min(maxItems, maxItemsLimit) * entryHeight;
  }

  return (
    <div className={clsx('dropdown-menu', `bg-${color ? color : 'primary'}`)}>
      <Input autoFocus fluid />
      <div
        // Ref must be there, or autoscroll to selected will not work
        ref={ref}
        className="dropdown-menu-entries"
        style={{ maxHeight: unit(`${getMaxHeight()}px`) }}
      >
        {isEmpty ? (
          <div className={entryClassName}>No options</div>
        ) : (
          options.map((option, index) => {
            const value = getOptionValue(option);
            const relativeIndex = Math.abs(index - selectedIndex);

            return (
              <DropdownMenuEntry
                key={value}
                index={relativeIndex}
                option={option}
                selected={selected}
                onSelected={onSelected}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function DropdownMenuEntry(props: DropdownMenuEntryProps) {
  const { index, option, selected, onSelected } = props;

  const value = getOptionValue(option);
  const interations = useButton({
    disabled: false,
    captureKeys: true,
    onClick: () => onSelected?.(value),
  });

  return (
    <div
      className={clsx('dropdown-menu-entry', selected === value && 'selected')}
      style={{ '--index': index || 0 } as CSSProperties}
      {...interations}
    >
      {getOptionDisplayText(option)}
    </div>
  );
}
