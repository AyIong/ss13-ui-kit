import { CSS_COLORS } from '@common/constants';
import { clamp01, keyOfMatchingRange, scale } from '@common/math';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import type { ProgressBarProps } from './types';

/**
 * ## ProgressBar
 *
 * Progress indicators inform users about the status of ongoing processes.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-progressbar--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function ProgressBar(props: ProgressBarProps) {
  const {
    className,
    value,
    minValue = 0,
    maxValue = 1,
    color,
    ranges = {},
    empty,
    children,
    fractionDigits = 0,
    ...rest
  } = props;
  const scaledValue = scale(value, minValue, maxValue);
  const hasContent = children !== undefined;

  const effectiveColor = color || keyOfMatchingRange(value, ranges) || 'default';

  // We permit colors to be in hex format, rgb()/rgba() format,
  // a name for a color-<name> class, or a base CSS class.
  const outerProps = computeBoxProps(rest);

  const outerClasses = ['ProgressBar', className, computeBoxClassName(rest)];
  const fillStyles: CSSProperties = {
    width: `${clamp01(scaledValue) * 100}%`,
  };
  if (CSS_COLORS.includes(effectiveColor as any) || effectiveColor === 'default') {
    // If the color is a color-<name> class, just use that.
    outerClasses.push(`ProgressBar--color--${effectiveColor}`);
  } else {
    // Otherwise, set styles directly.
    outerProps.style = { ...outerProps.style, borderColor: effectiveColor };
    fillStyles.backgroundColor = effectiveColor;
  }

  return (
    <div className={clsx(outerClasses)} {...outerProps}>
      <div className="ProgressBar__fill ProgressBar__fill--animated" style={fillStyles} />
      <div className="ProgressBar__content">
        {hasContent ? children : !empty && `${(scaledValue * 100).toFixed(fractionDigits)}%`}
      </div>
    </div>
  );
}
