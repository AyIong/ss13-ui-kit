import type { ReactNode, RefObject } from 'react';
import type { DropdownOption, DropdownSelected } from './types';

export enum DIRECTION {
  Current = 'current',
  Next = 'next',
  Previous = 'previous',
}

export const maxItemsDefault = 10;
export const maxItemsLimit = 20;
export const entryClassName = 'dropdown-menu-entry';

export function getOptionValue(
  option: DropdownSelected,
): string | number | undefined {
  return typeof option === 'string' ? option : option?.value;
}

export function getOptionDisplayText(
  option: DropdownOption,
): string | ReactNode {
  return typeof option === 'string' ? option : option.displayText;
}

export function getOptionIndex(
  options: DropdownOption[],
  option: DropdownSelected,
) {
  if (!option) {
    return -1;
  }

  return options.map(getOptionValue).indexOf(getOptionValue(option)) || 0;
}

// Changes gived index number depends on direction
export function changeIndex(
  direction: DIRECTION,
  options: DropdownOption[],
  index: number,
): number {
  let newIndex: number;
  const startIndex = 0;
  const endIndex = options.length - 1;

  if (index < 0) {
    newIndex = direction === 'next' ? endIndex : startIndex; // No selection yet
  } else if (direction === 'next') {
    newIndex = index === endIndex ? startIndex : index + 1; // Move to next option
  } else {
    newIndex = index === startIndex ? endIndex : index - 1; // Move to previous option
  }

  return newIndex;
}

/** Scroll dropdown content to selected option */
export function scrollToElement(
  ref: RefObject<HTMLDivElement | null> | undefined,
  props: {
    options: DropdownOption[];
    selected: DropdownSelected;
    position: number;
  },
): void {
  if (!ref) {
    return;
  }

  const { options, selected, position } = props;
  const selectedIndex = getOptionIndex(options, selected);
  let scrollPos = position;

  if (position < selectedIndex) {
    scrollPos = position < 2 ? 0 : position - 2;
  } else {
    scrollPos =
      position > options.length - 3 ? options.length - 1 : position - 2;
  }

  const dropdownMenu = ref.current;
  const element = dropdownMenu?.children[scrollPos] as HTMLElement;
  if (dropdownMenu && element) {
    dropdownMenu.scrollTop = element.offsetTop;
  }
}
