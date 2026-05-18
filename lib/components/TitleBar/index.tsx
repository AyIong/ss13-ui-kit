import { UI_DISABLED, UI_INTERACTIVE, UI_UPDATE } from '@common/constants';
import { classes } from '@common/react';
import { toTitleCase } from '@common/string';
import { Button, Icon } from '@components';
import { type PrimitiveAtom, useSetAtom } from 'jotai';
import type { TitleBarProps } from './types';

function statusToColor(status: number): string {
  switch (status) {
    case UI_INTERACTIVE:
      return 'good';
    case UI_UPDATE:
      return 'average';
    default:
      return 'bad';
  }
}

export function TitleBar(props: TitleBarProps) {
  const {
    children,
    className,
    title,
    status,
    canClose,
    styles,
    kitchenSinkAtom,
    onDragStart,
    onClose,
  } = props;

  const setKitchenSink = useSetAtom(kitchenSinkAtom as PrimitiveAtom<boolean>);
  const finalTitle =
    (typeof title === 'string' &&
      title === title.toLowerCase() &&
      toTitleCase(title)) ||
    title;

  return (
    <div
      className={classes(['titlebar', canClose && 'closeable', className])}
      style={styles}
    >
      <div className="dragzone" onMouseDown={(event) => onDragStart?.(event)} />
      {status === undefined ? (
        <Icon className="status-icon" name="tools" opacity={0.5} />
      ) : (
        <Icon
          className="status-icon"
          color={statusToColor(status)}
          name={status === UI_DISABLED ? 'eye-slash' : 'eye'}
        />
      )}
      <div className="title">{finalTitle}</div>
      {!!children && <div className="buttons">{children}</div>}
      {process.env.NODE_ENV !== 'production' && (
        <Button
          className="debug-button"
          color="green"
          leadingIcon={{ name: 'bug' }}
          onClick={() => setKitchenSink?.((prev) => !prev)}
        />
      )}
      {!!canClose && (
        <div className="close" onClick={onClose}>
          <div className="close-icon">
            <Icon name="times" />
          </div>
        </div>
      )}
    </div>
  );
}
