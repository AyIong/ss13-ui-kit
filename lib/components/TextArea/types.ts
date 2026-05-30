import type { TextInputProps } from '../Input/types';

export type BaseTextAreaProps = Partial<{
  /** Self-explained */
  dontUseTabForIndent: boolean;
  /**
   * Provides a Record with key: markupChar entries which can be used for
   * ctrl + key combinations to surround a selected text with the markup
   * character
   */
  userMarkup: Record<string, string>;
}>;

export type TextAreaProps = BaseTextAreaProps &
  TextInputProps<HTMLTextAreaElement>;
