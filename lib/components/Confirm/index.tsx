import { type MouseEvent, useState } from 'react';
import { ButtonContainer, ButtonContent, renderIcon } from '../Button';
import type { ConfirmProps } from './types';

/**
 * ## Confirm
 * A button with an extra confirmation step, using native button component.
 */
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

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
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
      {(startIcon || (confirmIcon && clickedOnce)) && renderIcon(startIcon || confirmIcon)}
      <ButtonContent>{clickedOnce ? confirmContent : children}</ButtonContent>
    </ButtonContainer>
  );
}
