import { isEscape, KEY } from '@common/keys';
import { inputDebounce } from '@common/timer';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import {
  type ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { TextInputProps } from './types';

/**
 * ## Input
 *
 * A basic text input which allow users to enter text into a UI.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-input--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function Input(props: TextInputProps) {
  const {
    autoFocus,
    autoSelect,
    className,
    disabled,
    expensive,
    fluid,
    maxLength,
    monospace,
    onBlur,
    onChange,
    onEnter,
    onEscape,
    onKeyDown,
    placeholder,
    ref,
    selfClear,
    alwaysUpdate,
    spellcheck = false,
    value,
    ...rest
  } = props;

  const ourRef = useRef<HTMLInputElement>(null);
  const inputRef = ref || ourRef;

  const [innerValue, setInnerValue] = useState(value || '');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.currentTarget.value;
    setInnerValue(value);
    if (expensive) {
      const debounceTime = typeof expensive === 'number' ? expensive : 250;
      inputDebounce(debounceTime)(() => onChange?.(value, event));
    } else {
      onChange?.(value, event);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    onKeyDown?.(event);

    if (event.key === KEY.Enter) {
      event.preventDefault();
      onEnter?.(event.currentTarget.value, event);
      if (selfClear) {
        setInnerValue('');
      }
      event.currentTarget.blur();
      return;
    }

    if (isEscape(event.key)) {
      event.preventDefault();
      onEscape?.(event.currentTarget.value, event);
      event.currentTarget.blur();
    }
  }

  /** Focuses the input on mount */
  useLayoutEffect(() => {
    if (autoFocus || autoSelect) {
      inputRef.current?.focus();
      if (autoSelect) {
        inputRef.current?.select();
      }
    }
  }, []);

  /** Updates the value on props change */
  useEffect(() => {
    if (
      (inputRef.current &&
        document.activeElement !== inputRef.current &&
        value !== innerValue) ||
      alwaysUpdate
    ) {
      setInnerValue(value || '');
    }
  }, [value]);

  const boxProps = computeBoxProps(rest);
  const classNames = clsx([
    'input',
    disabled && 'disabled',
    fluid && 'fluid',
    monospace && 'monospace',
    computeBoxClassName<HTMLInputElement>(rest),
    className,
  ]);

  return (
    <input
      {...boxProps}
      autoComplete="off"
      className={classNames}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={() => onBlur?.(innerValue)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={inputRef}
      spellCheck={spellcheck}
      type="text"
      value={innerValue}
    />
  );
}
