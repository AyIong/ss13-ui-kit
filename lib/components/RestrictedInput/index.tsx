import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import { type RefObject, useEffect, useRef, useState } from 'react';
import { useAutofocus } from 'ss13-ui-kit/hooks/autofocus';
import { useInput } from 'ss13-ui-kit/hooks/input';
import type { RestrictedInputProps } from './types';

/**
 * ## RestrictedInput
 *
 * Creates a numerical input which rejects improper keys.
 *
 * Has a special event for changes in validation states - `onValidationChange`.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-restrictedinput--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function RestrictedInput(props: RestrictedInputProps) {
  const {
    ref,
    selfClear,
    allowFloats,
    autoFocus,
    autoSelect,
    className,
    disabled,
    expensive,
    fluid,
    maxValue = 10000,
    minValue = 0,
    monospace,
    onBlur,
    onChange,
    onEnter,
    onEscape,
    onKeyDown,
    onValidationChange,
    value,
    ...rest
  } = props;

  const ourRef = useRef<HTMLInputElement>(null);
  const inputRef = (ref || ourRef) as RefObject<HTMLInputElement>;

  useAutofocus(inputRef, { autoFocus, autoSelect });
  const { innerValue, ...interactions } = useInput<HTMLInputElement, number>(
    inputRef,
    {
      isNumeric: true,
      dontUseTabForIndent: true,
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

  const [isValid, setIsValid] = useState(true);
  /** Check validity on input change */
  useEffect(() => {
    if (inputRef.current) {
      const formValid = inputRef.current.validity.valid;
      if (isValid !== formValid) {
        setIsValid(formValid);
        onValidationChange?.(formValid);
      }
    }
  }, [innerValue]);

  const boxProps = computeBoxProps(rest);
  const classNames = clsx([
    'input',
    'input-restricted',
    fluid && 'fluid',
    monospace && 'monospace',
    disabled && 'disabled',
    computeBoxClassName<HTMLInputElement>(rest),
    className,
    !isValid && 'input-restricted--invalid',
  ]);

  return (
    <input
      {...boxProps}
      autoComplete="off"
      className={classNames}
      disabled={disabled}
      max={maxValue}
      min={minValue}
      ref={inputRef}
      spellCheck={false}
      step={allowFloats ? 'any' : '1'}
      type="number"
      value={innerValue || minValue}
      {...interactions}
    />
  );
}
