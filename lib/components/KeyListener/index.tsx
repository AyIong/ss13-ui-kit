import { listenForKeyEvents } from '@common/hotkeys';
import { useEffect } from 'react';
import type { KeyListenerProps } from './types';

/**
 * ## KeyListener
 *
 * A component that listens for keyboard events and calls the provided
 * callbacks.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-keylistener--docs)
 */
export function KeyListener(props: KeyListenerProps) {
  const { onKey, onKeyDown, onKeyUp } = props;
  useEffect(() => {
    const dispose = listenForKeyEvents((key) => {
      if (onKey) {
        onKey(key);
      }

      if (key.isDown() && onKeyDown) {
        onKeyDown(key);
      }

      if (key.isUp() && onKeyUp) {
        onKeyUp(key);
      }
    });

    return () => {
      dispose();
    };
  }, []);

  return null;
}
