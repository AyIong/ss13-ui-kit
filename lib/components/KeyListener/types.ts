import type { KeyEvent } from 'tgui-core/common/events';

export type KeyListenerProps = Partial<{
  onKey: (key: KeyEvent) => void;
  onKeyDown: (key: KeyEvent) => void;
  onKeyUp: (key: KeyEvent) => void;
}>;
