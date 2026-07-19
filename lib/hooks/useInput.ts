import { type ChangeEvent, type RefObject, useEffect, useState } from 'react';
import { isEscape, KEY } from 'ss13-ui-kit/common/keys';
import { inputDebounce } from 'ss13-ui-kit/common/timer';
import type { BaseInputProps } from 'ss13-ui-kit/components/Input/types';
import type { BaseTextAreaProps } from 'ss13-ui-kit/components/TextArea/types';

/**
 * Returns input handlers for text inputs.
 */
type WritableElement = HTMLInputElement | HTMLTextAreaElement;

type useInputProps<TElement, TInput extends string | number> = Partial<{
  isNumeric?: boolean;
  onKeyDown?: React.KeyboardEventHandler<TElement>;
}> &
  BaseInputProps<TElement, TInput> &
  BaseTextAreaProps;

function getMarkupString(
  inputText: string,
  markupType: string,
  startPosition: number,
  endPosition: number,
): string {
  return `${inputText.substring(0, startPosition)}${markupType}${inputText.substring(startPosition, endPosition)}${markupType}${inputText.substring(endPosition)}`;
}

export function useInput<
  TElement extends WritableElement,
  TInput extends string | number,
>(ref: RefObject<TElement>, props: useInputProps<TElement, TInput>) {
  const {
    isNumeric,
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

  const [innerValue, setInnerValue] = useState(value || (isNumeric ? 0 : ''));
  /** Updates the initial value on props change */
  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const valueChanged = value !== innerValue;
    const inputBlured = document.activeElement !== ref.current;
    console.log(!(inputBlured && valueChanged) && 'Will not be updated');
    if ((inputBlured && valueChanged) || alwaysUpdate) {
      setInnerValue(value || (isNumeric ? 0 : ''));
    }
  }, [value]);

  function tryOnChange(value: TInput, event?: React.ChangeEvent<TElement>) {
    if (!onChange || disabled) {
      return;
    }

    if (expensive) {
      const debounceTime = typeof expensive === 'number' ? expensive : 250;
      inputDebounce(debounceTime)(() => onChange?.(value as TInput, event));
    } else {
      onChange?.(value as TInput, event);
    }
  }

  function handleBlur(_event: React.FocusEvent<TElement>) {
    onBlur?.(innerValue as TInput);
  }

  /**
   * Called each time when you typing something.
   * If expensive prop is present or have number,
   * will be called only when you stop typing.
   */
  function handleChange(event: ChangeEvent<TElement>): void {
    const value = event.currentTarget.value;
    const finalValue = isNumeric ? Number(value) : value;
    setInnerValue(finalValue);
    tryOnChange(finalValue as TInput, event);
  }

  function handleKeyDown(event: React.KeyboardEvent<TElement>): void {
    if (disabled) {
      return;
    }

    onKeyDown?.(event);
    const value = event.currentTarget.value;
    const finalValue = isNumeric ? Number(value) : value;

    // Enter
    if (event.key === KEY.Enter) {
      event.preventDefault();
      onEnter?.(finalValue as TInput, event);
      if (selfClear) {
        setInnerValue(isNumeric ? 0 : '');
      }
      event.currentTarget.blur();
      return;
    }

    // Escape
    if (isEscape(event.key)) {
      event.preventDefault();
      onEscape?.(finalValue as TInput, event);
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
      onChange?.(newValue as TInput, event as any);
      return;
    }

    // Minus
    if (isNumeric && event.key === KEY.Minus) {
      event.preventDefault();
      const newValue = Number(innerValue) * -1;
      setInnerValue(newValue);
      tryOnChange(newValue as TInput, event as any);
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
      onChange?.(newValue as TInput, event as any);
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
