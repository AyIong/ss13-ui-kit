import { useState } from 'react';
import { ButtonContainer, ButtonContent, ButtonIcon } from '../Button';
import type { ConfirmProps } from './types';

export function Confirm(props: ConfirmProps) {
  const {
    children,
    confirmContent = 'Confirm?',
    color,
    confirmColor = 'bad',
    startIcon,
    confirmIcon,
    onBlur,
    onClick,
    ...rest
  } = props;
  const [clickedOnce, setClickedOnce] = useState(false);

  function handleBlur(event: FocusEvent): void {
    setClickedOnce(false);
    onBlur?.(event);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>): void {
    if (!clickedOnce) {
      setClickedOnce(true);
      return;
    }

    onClick?.(event);
    setClickedOnce(false);
  }

  return (
    <ButtonContainer
      color={clickedOnce ? confirmColor : color}
      onBlur={handleBlur}
      onClick={handleClick}
      {...rest}
    >
      {(startIcon || (confirmIcon && clickedOnce)) && (
        <ButtonIcon {...(startIcon || confirmIcon)} />
      )}
      <ButtonContent>{clickedOnce ? confirmContent : children}</ButtonContent>
    </ButtonContainer>
  );
}
