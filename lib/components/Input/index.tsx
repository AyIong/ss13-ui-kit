import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import { type RefObject, useRef } from 'react';
import { useAutofocus } from 'ss13-ui-kit/hooks/autofocus';
import { useInput } from 'ss13-ui-kit/hooks/input';
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
  const inputRef = (ref || ourRef) as RefObject<HTMLInputElement>;

  useAutofocus(inputRef, { autoFocus, autoSelect });
  const { innerValue, ...interactions } = useInput<HTMLInputElement, string>(
    inputRef,
    {
      dontUseTabForIndent: true,
      alwaysUpdate,
      disabled,
      expensive,
      selfClear,
      value,
      onBlur,
      onChange,
      onKeyDown,
      onEnter,
      onEscape,
    },
  );

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
      ref={inputRef}
      className={classNames}
      type="text"
      autoComplete="off"
      value={innerValue}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      spellCheck={spellcheck}
      {...interactions}
    />
  );
}
