import { Box, Button } from '@components';
import { FloatingPortal } from '@floating-ui/react';
import { CSSTransition } from 'react-transitioning';
import { uiRootId } from 'ss13-ui-kit/common/constants';
import type { DialogProps } from './types';

/**
 * ## Dialog
 *
 * A themed dialog for user interaction.
 * Can be placed whenever you want, it always be
 * teleported to layout-root, over all content.
 *
 * To be opened, need prop `isOpen` true to be passed,
 * you can do that with useState inside your UI.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-dialog--docs)
 */
export function Dialog(props: DialogProps) {
  const { title, isOpen, onClose, children, width, height } = props;

  return (
    <FloatingPortal id={uiRootId}>
      <CSSTransition classNames="dialog" in={isOpen} duration={200}>
        <div className="dialog-wrapper">
          <Box className="dialog" width={width} height={height}>
            <div className="dialog-header">
              <div className="dialog-header--title">{title}</div>
              <Button
                className="dialog-header--button"
                variant="transparent"
                startIcon="times"
                tooltip={{ content: 'Close', position: 'top' }}
                onClick={onClose}
              />
            </div>
            <div className="dialog-content">{children}</div>
          </Box>
        </div>
      </CSSTransition>
    </FloatingPortal>
  );
}
