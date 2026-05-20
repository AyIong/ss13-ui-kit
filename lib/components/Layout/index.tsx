/**
 * @file
 * @copyright 2020 Aleksej Komarov
 * @license MIT
 */

import { classes } from '@common/react';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { useEffect } from 'react';
import type { BoxProps } from '../Box/types';
import type { LayoutProps } from './types';

export function Layout(props: LayoutProps) {
  const { className, theme = 'nanotrasen', children, ...rest } = props;

  const themeClass = `theme-${theme}`;
  useEffect(() => {
    document.documentElement.className = themeClass;
  }, [themeClass]);

  return (
    <div
      id="tgui-layout"
      className={classes(['layout', className, computeBoxClassName(rest)])}
      {...computeBoxProps(rest)}
    >
      {children}
    </div>
  );
}

function LayoutContent(props: BoxProps) {
  const { className, children, ...rest } = props;
  return (
    <div className="layout-decorations">
      <div
        className={classes([
          'layout-content',
          className,
          computeBoxClassName(rest),
        ])}
        {...computeBoxProps(rest)}
      >
        {children}
      </div>
    </div>
  );
}
Layout.Content = LayoutContent;
