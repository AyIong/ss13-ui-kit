import clsx from 'clsx';
import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { isEnter, KEY } from 'ss13-ui-kit/common/keys';
import { unit } from 'ss13-ui-kit/common/ui';
import { useButton } from 'ss13-ui-kit/hooks/useButton';
import { useScrollable } from 'ss13-ui-kit/hooks/useScrollable';
import { Input } from '../Input';
import {
  changeIndex,
  DIRECTION,
  entryClassName,
  getOptionDisplayText,
  getOptionIndex,
  getOptionValue,
  maxItemsDefault,
  maxItemsLimit,
  scrollToElement,
} from './helpers';
import type {
  DropdownMenuEntryProps,
  DropdownMenuProps,
  DropdownSelected,
} from './types';

export function DropdownMenu(props: DropdownMenuProps) {
  const { ref, color, options, maxItems, selected, onSelected } = props;

  const [entryHeight, setEntryHeight] = useState<number>(20); // 20 is fallback
  const [highlighted, setHighlighted] = useState<DropdownSelected>(selected);

  const isEmpty = options.length === 0;
  const selectedIndex = getOptionIndex(options, selected);
  const highlightedValue = getOptionValue(highlighted);

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

  function handlePress(event) {
    const highlightedIndex = getOptionIndex(options, highlighted);
    let newIndex: number = highlightedIndex;

    if (event.key === KEY.Up) {
      newIndex = changeIndex(DIRECTION.Previous, options, highlightedIndex);
    }

    if (event.key === KEY.Down) {
      newIndex = changeIndex(DIRECTION.Next, options, highlightedIndex);
    }

    if (isEnter(event.key)) {
      onSelected?.(highlightedValue);
    }

    setHighlighted(options[newIndex]);
    scrollToElement(ref, {
      options,
      selected: highlighted,
      position: newIndex,
    });
  }

  useEffect(() => {
    if (options.length > 1) {
      window.addEventListener('keydown', handlePress);
    }

    return () => {
      window.removeEventListener('keydown', handlePress);
    };
  }, [highlighted]);

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
                highlighted={highlightedValue}
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

function DropdownMenuEntry(
  props: DropdownMenuEntryProps & { highlighted?: string | number },
) {
  const { index, option, highlighted, selected, onSelected } = props;
  const value = getOptionValue(option);
  const interations = useButton({
    disabled: false,
    captureKeys: true,
    onClick: () => onSelected?.(value),
  });

  return (
    <div
      tabIndex={-1}
      className={clsx(
        'dropdown-menu-entry',
        selected === value && 'selected',
        highlighted === value && 'highlighted',
      )}
      style={{ '--index': index || 0 } as CSSProperties}
      {...interations}
    >
      {getOptionDisplayText(option)}
    </div>
  );
}
