import type { RefObject } from 'react';
import type { DropdownOption } from './types';

export enum DIRECTION {
  Current = 'current',
  Next = 'next',
  Previous = 'previous',
}

export const maxItemsDefault = 10;
export const maxItemsLimit = 20;
export const entryClassName = 'dropdown-menu-entry';

export function getOptionValue(option: DropdownOption): string | number {
  return typeof option === 'string' ? option : option.value;
}

export function getOptionDisplayText(option: DropdownOption): string {
  return typeof option === 'string' ? option : option.displayText;
}

export function getOptionIndex(
  options: DropdownOption[],
  optionToFind: DropdownOption | null | undefined,
) {
  if (!optionToFind) {
    return -1;
  }

  return (
    options.findIndex((option) => getOptionValue(option) === optionToFind) || 0
  );
}

/** Scroll dropdown content to selected option */
export function scrollToElement(
  ref: RefObject<HTMLDivElement | null> | undefined,
  scrollTo: number,
): void {
  if (!ref?.current) {
    return;
  }

  const entries = ref.current.querySelectorAll(`.${entryClassName}`);
  const target = entries[scrollTo] as HTMLElement | undefined;
  if (target) {
    target.scrollIntoView({ block: 'center' });
  }
}
