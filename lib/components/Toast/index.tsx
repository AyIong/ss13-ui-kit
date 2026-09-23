import clsx from 'clsx';
import type { CSSProperties } from 'react';
import toast, { resolveValue, useToaster } from 'react-hot-toast/headless';
import { colorClassName } from 'tgui-core/common/color';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { ToastProps } from './types';

// How long toast will be visible in milliseconds.
const defaultDuration = 500000;
// Maximum visible toasts
const toastsLimit = 3;

export function Toaster() {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  return (
    <div className="toaster" onMouseEnter={() => startPause()} onMouseLeave={() => endPause()}>
      {toasts.map((toast, toastIndex) => {
        const offset = calculateOffset(toast, { gutter: 0 });
        function calculateHeight(element) {
          if (element && typeof toast.height !== 'number') {
            const height = element.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        }

        return (
          <div
            key={toast.id}
            ref={calculateHeight}
            className={clsx(
              'toast',
              !toast.visible && 'hidden',
              toastIndex > toastsLimit - 1 && 'off-limit',
            )}
            style={
              {
                '--index': toastIndex,
                '--offset': `${offset}px`,
                '--duration': `${toast.duration || defaultDuration}ms`,
              } as CSSProperties
            }
          >
            {resolveValue(toast.message, toast)}
          </div>
        );
      })}
    </div>
  );
}

export function createToast(props: ToastProps) {
  const { className, title, content, icon, color, colorized } = props;
  const ourToast = (toastInstance) => (
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
          <div className={clsx('toast-content--title')}>
            <div className="title">{title}</div>
            <Button
              color={color}
              variant="transparent"
              startIcon="times"
              onClick={() => {
                toast.dismiss(toastInstance.id);
              }}
            />
          </div>
          <div className={clsx('toast-content--description')}>{content}</div>
        </div>
      </div>
      <div className="toast-progress" />
    </div>
  );

  return toast.custom(ourToast, {
    duration: props.duration || defaultDuration,
    removeDelay: 200,
  });
}
