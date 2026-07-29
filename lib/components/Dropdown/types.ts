import type { ReactNode, RefObject } from 'react';
import type { BoxProps } from '../Box/types';
import type { IconProps } from '../Icon/types';

export type DropdownOption = string | DropdownEntry;

export type DropdownEntry = {
  displayText: string;
  value: string | number;
};

// Typescript will say you to fuck off when you try to use iconOnly without icon
type DropdownIconProps =
  | {
      /** Icon to display in dropdown button */
      icon?: IconProps;
      /** Whether the icon should be displayed alone */
      iconOnly?: never;
    }
  | { icon: IconProps; iconOnly?: boolean };

export type DropdownProps = Partial<{
  /** Whether to display previous / next buttons */
  buttons: boolean;
  /** Color of dropdown button */
  color: string;
  /** Disables the dropdown */
  disabled: boolean;
  /** Overwrites selection text with this. Good for objects etc. */
  displayText: ReactNode;
  /** Width of the dropdown menu in box units. Default use dropdown width */
  menuWidth: number;
  /** Text to show when nothing has been selected. */
  placeholder: string;
  /** Called when dropdown button is clicked */
  onClick: (event) => void;
}> &
  DropdownMenuProps &
  DropdownIconProps;

type DropdownSelectionProps = {
  /** Currently selected entry to display. Can be left stateless to permanently display this value. */
  selected: DropdownOption | null | undefined;
  /** Called when a value is picked from the list, `value` is the value that was picked */
  onSelected: (value: any) => void;
};

export type DropdownMenuHandle = {
  scrollToIndex: (index: number) => void;
};

export type DropdownMenuProps = {
  ref?: RefObject<DropdownMenuHandle | null>;
  /** An array of strings which will be displayed in the
  dropdown when open. See Dropdown.tsx for more advanced usage with DropdownEntry */
  options: DropdownOption[];
} & Partial<{
  /**
   * Maximum number of items to show when dropdown opened.
   * Limited to 20
   */
  maxItems: number;
}> &
  DropdownSelectionProps &
  Omit<BoxProps, 'maxHeight' | 'ref'>;

export type DropdownMenuEntryProps = {
  index?: number;
  option: DropdownOption;
} & DropdownSelectionProps;
