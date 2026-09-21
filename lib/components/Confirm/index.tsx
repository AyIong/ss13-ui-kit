import { useLongPress } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { type CSSProperties, useEffect, useState } from 'react';
import { ButtonContainer, ButtonContent, renderIcon } from '../Button';
import type { ConfirmProps } from './types';

const defaultConfirmDelay = 1000;
const resetConfirmedDelay = 3000;
const resetCanceledDelay = 500;

/**
 * ## Confirm
 * A button with an extra confirmation step, using native button component.
 */
export function Confirm(props: ConfirmProps) {
  const {
    children,
    color,
    startIcon,
    confirmDelay,
    confirmedContent,
    confirmedIcon,
    onClick,
    ...rest
  } = props;

  const hasConfirmedContent = confirmedContent || confirmedIcon;
  const [holding, setHolding] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const handlePress = useLongPress(
    (event) => {
      setHolding(false);
      setConfirmed(true);
      onClick?.(event);
    },
    {
      threshold: confirmDelay || defaultConfirmDelay,
      onStart: () => {
        setConfirmed(false);
        setCanceled(false);
        setHolding(true);
      },
      onCancel: () => {
        setHolding(false);
        setCanceled(true);
      },
    },
  );

  useEffect(() => {
    if (!confirmed) {
      return;
    }

    const timer = setTimeout(() => setConfirmed(false), resetConfirmedDelay);
    return () => {
      clearTimeout(timer);
    };
  }, [confirmed]);

  useEffect(() => {
    if (!canceled) {
      return;
    }

    const timer = setTimeout(() => setCanceled(false), resetCanceledDelay);
    return () => {
      clearTimeout(timer);
    };
  }, [canceled]);

  return (
    <ButtonContainer
      className={clsx('button-confirm', confirmed && 'confirmed')}
      style={
        {
          '--confirm-delay': `${confirmDelay || defaultConfirmDelay}ms`,
        } as CSSProperties
      }
      color={color}
      {...handlePress}
      {...rest}
    >
      {/* Render both, so button size will be static */}
      <div
        className={clsx(
          'button-confirm-content',
          (!confirmed || !hasConfirmedContent) && 'visible',
        )}
      >
        {startIcon && renderIcon(startIcon)}
        <ButtonContent>{children}</ButtonContent>
      </div>
      {hasConfirmedContent && (
        <div className={clsx('button-confirm-content', confirmed && 'visible')}>
          {confirmedIcon && renderIcon(confirmedIcon)}
          <ButtonContent>{confirmedContent || children}</ButtonContent>
        </div>
      )}
      <div
        className={clsx(
          'button-confirm--fill',
          holding && 'holding',
          confirmed && 'confirmed',
          canceled && 'canceled',
        )}
      />
    </ButtonContainer>
  );
}
