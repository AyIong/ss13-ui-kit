import { type ChangeEvent, type RefObject, useEffect, useState } from 'react';
import { isEscape, KEY } from 'ss13-ui-kit/common/keys';
import { inputDebounce } from 'ss13-ui-kit/common/timer';
import type {
  BaseInputProps,
  InputEventProps,
} from 'ss13-ui-kit/components/Input/types';
import type { BaseTextAreaProps } from 'ss13-ui-kit/components/TextArea/types';

/**
 * Returns input handlers for text inputs.
 */
type WritableElement = HTMLInputElement | HTMLTextAreaElement;

type useInputProps<T extends WritableElement> = Partial<{
  onKeyDown?: React.KeyboardEventHandler<T>;
}> &
  BaseInputProps<T> &
  BaseTextAreaProps &
  InputEventProps<T>;

function getMarkupString(
  inputText: string,
  markupType: string,
  startPosition: number,
  endPosition: number,
): string {
  return `${inputText.substring(0, startPosition)}${markupType}${inputText.substring(startPosition, endPosition)}${markupType}${inputText.substring(endPosition)}`;
}

export function useInput<T extends WritableElement>(
  ref: RefObject<T>,
  props: useInputProps<T>,
) {
  const {
    alwaysUpdate,
    disabled,
    expensive,
    selfClear,
    userMarkup,
    dontUseTabForIndent,
    value,
    onChange,
    onKeyDown,
    onBlur,
    onEnter,
    onEscape,
  } = props;

  const [innerValue, setInnerValue] = useState(value || '');

  /** Updates the initial value on props change */
  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const valueChanged = value !== innerValue;
    const inputBlured = document.activeElement !== ref.current;
    if ((inputBlured && valueChanged) || alwaysUpdate) {
      setInnerValue(value || '');
    }
  }, [value]);

  function handleBlur(_event: React.FocusEvent<T>) {
    onBlur?.(innerValue);
  }

  /**
   * Called each time when you typing something.
   * If expensive prop is present or have number,
   * will be called only when you stop typing.
   */
  function handleChange(event: ChangeEvent<T>): void {
    const value = event.currentTarget.value;
    setInnerValue(value);

    if (!onChange || disabled) {
      return;
    }

    if (expensive) {
      const debounceTime = typeof expensive === 'number' ? expensive : 250;
      inputDebounce(debounceTime)(() => onChange?.(value, event));
    } else {
      onChange?.(value, event);
    }
  }

  /**
   * Called when component receive keyboard events
   *
   */
  function handleKeyDown(event: React.KeyboardEvent<T>): void {
    if (disabled) {
      return;
    }

    onKeyDown?.(event);

    // Enter
    if (event.key === KEY.Enter) {
      event.preventDefault();
      onEnter?.(event.currentTarget.value, event);
      if (selfClear) {
        setInnerValue('');
      }
      event.currentTarget.blur();
      return;
    }

    // Escape
    if (isEscape(event.key)) {
      event.preventDefault();
      onEscape?.(event.currentTarget.value, event);
      event.currentTarget.blur();
      return;
    }

    // Tab
    if (!dontUseTabForIndent && event.key === KEY.Tab) {
      event.preventDefault();
      let { value, selectionStart, selectionEnd } = event.currentTarget;
      const start = selectionStart || 0;
      const end = selectionEnd || start;

      const newValue = `${value.substring(0, start)}\t${value.substring(end)}`;
      setInnerValue(newValue);
      selectionEnd = start + 1;

      // Save our tabulation on backend
      onChange?.(newValue, event as any);
      return;
    }

    // User markup
    const modKey = event.ctrlKey || event.metaKey;
    if (userMarkup && modKey && userMarkup[event.key]) {
      event.preventDefault();

      let { value, selectionStart, selectionEnd } = event.currentTarget;
      const start = selectionStart || 0;
      const end = selectionEnd || start;

      const markupString = userMarkup[event.key];
      const newValue = getMarkupString(value, markupString, start, end);
      setInnerValue(newValue);
      selectionEnd = end + markupString.length * 2;

      // Save our tabulation on backend
      onChange?.(newValue, event as any);
      return;
    }
  }

  return {
    innerValue: innerValue,
    onBlur: handleBlur,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  };
}
