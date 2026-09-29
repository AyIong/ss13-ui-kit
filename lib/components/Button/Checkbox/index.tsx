import { ButtonContainer, ButtonContent, ButtonIcon } from '..';
import type { CheckboxProps } from './types';

/**
 * ## Checkbox
 * A ghetto checkbox, made entirely using existing Button API.
 */
export function Checkbox(props: CheckboxProps) {
  const { children, checked, ...rest } = props;

  return (
    <ButtonContainer variant="transparent" selected={checked} {...rest}>
      <ButtonIcon name={checked ? 'square-check' : 'square-o'} />
      <ButtonContent>{children}</ButtonContent>
    </ButtonContainer>
  );
}
