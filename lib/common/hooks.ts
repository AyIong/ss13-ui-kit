import { KEY } from './keys';

/**
 * Unifies interaction events between all
 * interactive elements, such as buttons.
 *
 * For usage example, see Button component.
 */
interface UseInteractionsProps {
  disabled?: boolean;
  captureKeys?: boolean;
  onClick?: (event) => void;
}

export function useInteractions({
  disabled,
  captureKeys = true,
  onClick,
}: UseInteractionsProps) {
  function handleClick(event) {
    if (!disabled) {
      onClick?.(event);
    }
  }

  function handleKeyDown(event) {
    if (!captureKeys) {
      return;
    }

    // Simulate a click when pressing space or enter.
    if (event.key === KEY.Space || event.key === KEY.Enter) {
      event.preventDefault();

      if (!disabled) {
        onClick?.(event);
      }
    }
  }

  return {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
}
