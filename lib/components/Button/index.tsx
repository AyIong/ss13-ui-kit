import { KEY } from '@common/keys';
import { classes } from '@common/react';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { Icon, Tooltip } from '@components';
import type { Placement } from '@floating-ui/react';
import type { ButtonProps } from './types';

/**
 * Base Button component.
 * If you add something here, all buttons will have it.
 *
 * For button specific features, go to propper component.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    captureKeys,
    fluid,
    color,
    className,
    circular,
    disabled,
    selected,
    leadingIcon,
    trailingIcon,
    tooltip,
    onClick,
    ...rest
  } = props;

  let finalButton = (
    <button
      className={classes([
        'button',
        fluid && 'fluid',
        color && color,
        disabled && 'disabled',
        selected && 'selected',
        circular && 'circular',
        className,
        computeBoxClassName(rest),
      ])}
      onClick={(event) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      }}
      onKeyDown={(event) => {
        if (!captureKeys) {
          return;
        }

        // Simulate a click when pressing space or enter.
        if (event.key === KEY.Space || event.key === KEY.Enter) {
          event.preventDefault();
          if (!disabled && onClick) {
            onClick(event);
          }
          return;
        }
      }}
      {...computeBoxProps(rest)}
    >
      {leadingIcon && <Icon {...leadingIcon} />}
      {children && <div className="content">{children}</div>}
      {trailingIcon && <Icon {...trailingIcon} />}
    </button>
  );

  if (tooltip) {
    finalButton = (
      <Tooltip
        content={tooltip.content}
        position={tooltip.position as Placement}
      >
        {finalButton}
      </Tooltip>
    );
  }

  return finalButton;
}
