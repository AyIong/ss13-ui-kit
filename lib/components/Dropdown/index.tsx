import { unit } from '@common/ui';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useButton } from 'ss13-ui-kit/hooks/useButton';
import { Button, ButtonContainer, ButtonContent, ButtonIcon } from '../Button';
import { Floating } from '../Floating';
import { Icon } from '../Icon';
import { DropdownMenu } from './DropdownMenu';
import { DIRECTION, getOptionValue, getSelectedIndex } from './helpers';
import type { DropdownProps } from './types';

/**
 * ## Dropdown
 *
 * A simple dropdown box component. Lets the user select from a list of options
 * and displays selected entry.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-dropdown--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function Dropdown(props: DropdownProps) {
  const {
    color,
    buttons,
    placeholder,
    className,
    displayText,
    icon,
    iconOnly,
    maxItems,
    options,
    width,
    menuWidth,
    selected,
    disabled,
    onClick,
    onSelected,
  } = props;

  const [isOpen, setOpen] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const interactions = useButton({
    captureKeys: true,
    disabled: disabled && !isOpen,
    onClick,
  });

  const selectedIndex = getSelectedIndex(options, selected);
  const hasSelectedIndex = selectedIndex !== -1;
  const displayedText =
    displayText ||
    (selected && getOptionValue(selected)) ||
    placeholder ||
    'Select...';

  /** Scroll dropdown content to selected option */
  function scrollToElement(position: number): void {
    let scrollPos = position;
    if (position < selectedIndex) {
      scrollPos = position < 2 ? 0 : position - 2;
    } else {
      scrollPos =
        position > options.length - 3 ? options.length - 1 : position - 2;
    }

    const dropdownMenu = dropdownMenuRef.current;
    const element = dropdownMenu?.children[scrollPos] as HTMLElement;
    if (dropdownMenu && element) {
      dropdownMenu.scrollTop = element.offsetTop;
    }
  }

  /** Update the selected value when clicking the left/right buttons */
  function updateSelected(direction: DIRECTION): void {
    if (options.length < 1 || disabled) {
      return;
    }

    let newIndex: number;
    const startIndex = 0;
    const endIndex = options.length - 1;

    if (selectedIndex < 0) {
      newIndex = direction === 'next' ? endIndex : startIndex; // No selection yet
    } else if (direction === 'next') {
      newIndex = selectedIndex === endIndex ? startIndex : selectedIndex + 1; // Move to next option
    } else {
      newIndex = selectedIndex === startIndex ? endIndex : selectedIndex - 1; // Move to previous option
    }

    if (isOpen) {
      scrollToElement(newIndex);
    }
    onSelected?.(getOptionValue(options[newIndex]));
  }

  return (
    <div
      style={{ width: unit(width) }}
      className={clsx(
        'dropdown',
        isOpen && 'dropdown-open',
        iconOnly && 'icon-only',
        className,
      )}
    >
      <Floating
        closeAfterInteract
        allowedOutsideClasses=".dropdown"
        disabled={disabled}
        contentAutoWidth={!menuWidth}
        placement={iconOnly && 'bottom-start'}
        contentClasses="dropdown-menu-wrapper"
        content={
          <DropdownMenu
            ref={dropdownMenuRef}
            color={color}
            maxItems={maxItems}
            options={options}
            selected={selected}
            onSelected={onSelected}
          />
        }
        contentStyles={!!menuWidth && { width: unit(menuWidth) }}
        onOpenChange={setOpen}
        onMounted={() => {
          if (!isOpen && !hasSelectedIndex) {
            return;
          }
          scrollToElement(selectedIndex);
        }}
      >
        <ButtonContainer
          color={color}
          disabled={disabled}
          className="dropdown-handler"
          {...interactions}
        >
          {icon && <ButtonIcon className="dropdown-icon" {...icon} />}
          <ButtonContent className="dropdown-text">
            {displayedText}
          </ButtonContent>
          <Icon className="dropdown-chevron" name="chevron-down" />
        </ButtonContainer>
      </Floating>
      {buttons && (
        <>
          <Button
            disabled={disabled}
            startIcon="chevron-left"
            onClick={() => {
              updateSelected(DIRECTION.Previous);
            }}
          />
          <Button
            disabled={disabled}
            startIcon="chevron-right"
            onClick={() => {
              updateSelected(DIRECTION.Next);
            }}
          />
        </>
      )}
    </div>
  );
}
