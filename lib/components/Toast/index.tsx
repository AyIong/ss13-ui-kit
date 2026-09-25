import clsx from 'clsx';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { toast as hotToast, resolveValue, type Toast, useToaster } from 'react-hot-toast/headless';
import { colorClassName } from 'tgui-core/common/color';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { ToastProps } from './types';

// How long toast will be visible in milliseconds
const defaultDuration = 5000;
// Maximum visible toasts
const toastsLimit = 3;
// How long pause will continue after mouse leaves toasts in ms.
const mouseLeaveCooldown = 300;

export function Toaster() {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  const mouseLeaveTimeout = useRef<NodeJS.Timeout>(null);
  const [paused, setPaused] = useState<boolean>(false);

  function clearTimer() {
    if (mouseLeaveTimeout.current) {
      clearTimeout(mouseLeaveTimeout.current);
      mouseLeaveTimeout.current = null;
      console.log('Timer cleared');
    }
  }

  function handleMouseEnter() {
    clearTimer();
    startPause();
    setPaused(true);
    console.log('Mouse entered');
  }

  function handleMouseLeave() {
    clearTimer();
    mouseLeaveTimeout.current = setTimeout(() => {
      endPause();
      setPaused(false);
    }, mouseLeaveCooldown);
    console.log('Mouse leaved');
  }

  // Remove pause if user closed every toast manually
  useEffect(() => {
    if (toasts.length === 0 && paused) {
      endPause();
      setPaused(false);
      clearTimer();
      console.log('No toasts, resets pause');
    }
  }, [toasts.length]);

  return (
    <div
      className={clsx('toaster', paused && 'paused')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {toasts.map((toastElement, toastIndex) => {
        const isOffLimit = toastIndex >= toastsLimit;

        return (
          <div
            key={toastElement.id}
            className={clsx('toast', !toastElement.visible && 'hidden', isOffLimit && 'off-limit')}
            style={
              {
                '--index': toastIndex,
                '--duration': `${toastElement.duration || defaultDuration}ms`,
              } as CSSProperties
            }
          >
            {resolveValue(toastElement.message, toastElement)}
          </div>
        );
      })}
    </div>
  );
}

export function toast(props: ToastProps) {
  const { className, title, content, icon, color, colorized, duration } = props;
  const ourToast = (toastInstance: Toast) => (
    <div
      className={clsx('toast-inner', className, colorized && 'colorized', colorClassName(color))}
    >
      <div className={clsx('toast-content--wrapper', icon && 'has-icon')}>
        {icon && (
          <div className="toast-icon">
            <Icon color={icon.color || color} {...icon} />
          </div>
        )}
        <div className="toast-content">
          <div className="toast-content--title">
            <div className="title">{title}</div>
            <Button
              color={color}
              variant="transparent"
              startIcon="times"
              onClick={() => {
                hotToast.dismiss(toastInstance.id);
              }}
            />
          </div>
          <div className="toast-content--description">{content}</div>
        </div>
      </div>
      <div className="toast-progress" />
    </div>
  );

  return hotToast.custom(ourToast, {
    duration: duration || defaultDuration,
    removeDelay: 200,
  });
}
