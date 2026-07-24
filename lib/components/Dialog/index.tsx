import { Box, Button, Dimmer } from '@components';
import { FloatingPortal } from '@floating-ui/react';
import { useEffect } from 'react';
import { CSSTransition } from 'react-transitioning';
import { uiRootId } from 'ss13-ui-kit/common/constants';
import { isEnter, isEscape } from 'ss13-ui-kit/common/keys';
import type { DialogProps } from './types';

/**
 * ## Dialog
 *
 * A themed dialog for user interaction.
 * Can be placed whenever you want, it always be
 * teleported to layout-root, over all content.
 *
 * Uses a
 * [Dimmer](https://tgstation.github.io/tgui-core/?path=/docs/components-dimmer--docs)
 * under the hood, and dynamically adjusts its own size to fit the content
 * you're trying to display.
 *
 * To be opened, need prop `isOpen` true to be passed,
 * you can do that with useState inside your UI, or just specify it manually,
 * in that case dialog will be open always, and cannot be closed if onClose,
 * function not passed.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-dialog--docs)
 */
export function Dialog(props: DialogProps) {
  const { children, title, isOpen, width, height, onEnter, onClose } = props;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (isEnter(event.key)) {
        onEnter?.(event);
      }

      if (isEscape(event.key)) {
        onClose?.();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onEnter]);

  return (
    <FloatingPortal id={uiRootId}>
      <CSSTransition appear classNames="dialog" in={isOpen} duration={200}>
        <Dimmer className="dialog-wrapper" onClick={onClose}>
          <Box
            className="dialog"
            width={width}
            height={height}
            // We don't want to close it, when user interacting with content
            onClick={(event) => event.stopPropagation()}
          >
            {title && (
              <div className="dialog-header">
                <div className="dialog-header--title">{title}</div>
                {onClose && (
                  <Button
                    className="dialog-header--button"
                    variant="transparent"
                    startIcon="times"
                    tooltip={{ content: 'Close', position: 'top' }}
                    onClick={onClose}
                  />
                )}
              </div>
            )}
            <div className="dialog-content">{children}</div>
          </Box>
        </Dimmer>
      </CSSTransition>
    </FloatingPortal>
  );
}
