import { KEY } from 'ss13-ui-kit/common/keys';
import type { ButtonInteractionProps } from 'ss13-ui-kit/components/Button/types';

/**
 * Returns input handlers for
 * clickable elements, such as buttons.
 */
type useButtonProps = Partial<{
  disabled: boolean;
}> &
  ButtonInteractionProps;

export function useButton(props: useButtonProps) {
  const { disabled, captureKeys, onClick } = props;

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
