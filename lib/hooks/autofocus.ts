import { type RefObject, useEffect } from 'react';

/**
 * Makes element focused when rendered
 * useful for inputs
 */
type UseAutofocusProps = Partial<{
  autoFocus: boolean;
  autoSelect: boolean;
}>;

type InputTypes = HTMLInputElement | HTMLTextAreaElement;

export function useAutofocus(
  ref: RefObject<HTMLElement | InputTypes>,
  props: UseAutofocusProps,
) {
  const { autoFocus, autoSelect } = props;

  useEffect(() => {
    const element = ref.current;
    if (!element && !(autoFocus || autoSelect)) {
      return;
    }

    element.focus();

    const input = element as InputTypes;
    if (typeof input.select === 'function' && autoSelect) {
      input.select();
    }
  }, []);
}
