import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import { Box } from '../Box';
import { Icon } from '../Icon';
import type { IconNamesUnion } from '../Icon/types';
import type { NoticeBoxProps, NoticeType } from './types';

/**
 * ## NoticeBox
 *
 * A notice box which warns you about something very important.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-noticebox--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-modern/?path=/docs/components-box--docs)
 */
export function NoticeBox(props: NoticeBoxProps) {
  const { children, className, color, info, success, warning, danger, ...rest } = props;
  const activeType = info ? 'info' : success ? 'success' : warning ? 'warning' : danger && 'danger';

  const typeIcon: Record<NoticeType, IconNamesUnion> = {
    info: 'circle-info',
    success: 'circle-check',
    warning: 'triangle-exclamation',
    danger: 'skull',
  };

  return (
    <Box
      className={classes(
        'noticebox',
        info && 'type-info',
        success && 'type-success',
        warning && 'type-warning',
        danger && 'type-danger',
        className,
        colorClassName(color || 'camel'),
      )}
      {...rest}
    >
      {activeType && (
        <div className="noticebox-icon">
          <Icon name={typeIcon[activeType]} />
        </div>
      )}
      <div className="noticebox-content">{children}</div>
    </Box>
  );
}
