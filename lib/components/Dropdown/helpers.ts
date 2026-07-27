import type { ReactNode } from 'react';
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

export function getOptionDisplayText(
  option: DropdownOption,
): string | ReactNode {
  return typeof option === 'string' ? option : option.displayText;
}

export function getSelectedIndex(
  options: DropdownOption[],
  selected: DropdownOption | null | undefined,
) {
  if (!selected) {
    return -1;
  }

  return (
    options.findIndex((option) => getOptionValue(option) === selected) || 0
  );
}
