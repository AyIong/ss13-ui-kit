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
import { useFuzzySearch } from 'ss13-ui-kit/hooks/useFuzzySearch';
import { useScrollable } from 'ss13-ui-kit/hooks/useScrollable';
import { Input } from '../Input';
import {
  entryClassName,
  getOptionDisplayText,
  getOptionIndex,
  getOptionValue,
  maxItemsDefault,
  maxItemsLimit,
  scrollToElement,
} from './helpers';
import type { DropdownMenuEntryProps, DropdownMenuProps } from './types';

export function DropdownMenu(props: DropdownMenuProps) {
  const { ref, color, options, maxItems, selected, onSelected } = props;

  const selectedIndex = getOptionIndex(options, selected);
  const [entryHeight, setEntryHeight] = useState<number>(20); // 20 is fallback
  const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex);
  const { query, setQuery, results } = useFuzzySearch({
    searchArray: options,
    getSearchString: (option) => getOptionDisplayText(option),
  });

  const isEmpty = options.length === 0;
  const displayOptions = query ? results : options;

  // Get max height, depend on maxItems and entryHeight
  // By default, returns 10 * ~20 (~200px)
  function getMaxHeight() {
    if (!maxItems) {
      return maxItemsDefault * entryHeight;
    }
    return Math.min(maxItems, maxItemsLimit) * entryHeight;
  }

  function handleKeyDown(event) {
    if (isEmpty) {
      return;
    }

    if (event.key === KEY.Up) {
      event.preventDefault();
      setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
    }

    if (event.key === KEY.Down) {
      event.preventDefault();
      setHighlightedIndex(
        Math.min(highlightedIndex + 1, displayOptions.length - 1),
      );
    }

    if (isEnter(event.key)) {
      const option = displayOptions[highlightedIndex];
      if (option) {
        onSelected?.(getOptionValue(option));
      }
    }
  }

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

  // Reset highlightedIndex on search
  useEffect(() => {
    if (query) {
      setHighlightedIndex(0);
    }
  }, [query]);

  // Scroll to selected element, if we have one
  useEffect(() => {
    scrollToElement(ref, highlightedIndex);
  }, [highlightedIndex]);

  return (
    <div className={clsx('dropdown-menu', `bg-${color ? color : 'primary'}`)}>
      <Input
        autoFocus
        fluid
        placeholder="Search..."
        value={query}
        onChange={setQuery}
        onKeyDown={handleKeyDown}
      />
      <div
        // Ref must be there, or autoscroll to selected will not work
        ref={ref}
        tabIndex={-1}
        className="dropdown-menu-entries"
        style={{ maxHeight: unit(`${getMaxHeight()}px`) }}
      >
        {isEmpty || (query && results.length === 0) ? (
          <div className={entryClassName}>No options</div>
        ) : (
          displayOptions.map((option, index) => {
            const value = getOptionValue(option);
            const relativeIndex = Math.abs(index - selectedIndex);

            return (
              <DropdownMenuEntry
                key={value}
                index={relativeIndex}
                option={option}
                selected={selected}
                highlighted={index === highlightedIndex}
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
  props: DropdownMenuEntryProps & { highlighted?: boolean },
) {
  const { index, option, selected, highlighted, onSelected } = props;
  const value = getOptionValue(option);
  const interations = useButton({
    disabled: false,
    captureKeys: true,
    onClick: () => onSelected?.(value),
  });

  return (
    <div
      className={clsx(
        'dropdown-menu-entry',
        selected === value && 'selected',
        highlighted && 'highlighted',
      )}
      style={{ '--index': index || 0 } as CSSProperties}
      {...interations}
    >
      {getOptionDisplayText(option)}
    </div>
  );
}
