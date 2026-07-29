import type { DropdownOption } from './types';

export enum DIRECTION {
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

  return options.findIndex((option) => getOptionValue(option) === optionToFind);
}

// Scroll dropdown content to selected option
export function scrollToElement(element: HTMLElement, scrollTo: number): void {
  const entries = element.querySelectorAll(`.${entryClassName}`);
  const target = entries[scrollTo];
  if (target) {
    target.scrollIntoView({ block: 'center' });
  }
}

// Get max height, depend on maxItems and entryHeight
// By default, returns 10 * ~20 (~200px)
export function getMaxHeight(maxItems, entryHeight) {
  if (!maxItems) {
    return maxItemsDefault * entryHeight;
  }
  return Math.min(maxItems, maxItemsLimit) * entryHeight;
}
