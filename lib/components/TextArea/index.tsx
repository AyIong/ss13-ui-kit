import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { useAutofocus, useInput } from '@hooks';
import clsx from 'clsx';
import { type RefObject, useRef } from 'react';
import type { TextAreaProps } from './types';

/**
 * ## Textarea
 *
 * An input for larger amounts of text. Use this when you want inputs larger
 * than one row.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-textarea--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function TextArea(props: TextAreaProps) {
  const {
    autoFocus,
    autoSelect,
    className,
    disabled,
    dontUseTabForIndent,
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
    spellcheck = false,
    userMarkup,
    value,
    ...rest
  } = props;

  const ourRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = (ref || ourRef) as RefObject<HTMLTextAreaElement>;

  useAutofocus(textareaRef, { autoFocus, autoSelect });
  const { innerValue, ...interactions } = useInput<HTMLTextAreaElement, string>(
    textareaRef,
    {
      userMarkup,
      dontUseTabForIndent,
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
    'input-textarea',
    fluid && 'fluid',
    monospace && 'monospace',
    disabled && 'disabled',
    computeBoxClassName<HTMLTextAreaElement>(rest),
    className,
  ]);

  return (
    <textarea
      {...boxProps}
      autoComplete="off"
      className={classNames}
      maxLength={maxLength}
      placeholder={placeholder}
      ref={textareaRef}
      spellCheck={spellcheck}
      value={innerValue}
      {...interactions}
    />
  );
}
