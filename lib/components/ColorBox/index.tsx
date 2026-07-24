import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { computeBoxClassName, computeBoxProps } from 'ss13-ui-kit/common/ui';
import type { ColorBoxProps } from './types';

export function ColorBox(props: ColorBoxProps) {
  const { className, color, content, ...rest } = props;
  const trimmedContent = content?.at(0);

  return (
    <div
      {...computeBoxProps(rest)}
      className={clsx('colorbox', className, computeBoxClassName(rest))}
      style={{ '--colorbox-bg': color } as CSSProperties}
    >
      {trimmedContent}
    </div>
  );
}
