import { ButtonContainer, ButtonContent, ButtonIcon } from '../Button';
import type { CheckboxProps } from './types';

export function Checkbox(props: CheckboxProps) {
  const { children, checked, ...rest } = props;

  return (
    <ButtonContainer variant="transparent" selected={checked} {...rest}>
      <ButtonIcon regular name={checked ? 'square-check' : 'square'} />
      <ButtonContent>{children}</ButtonContent>
    </ButtonContainer>
  );
}
