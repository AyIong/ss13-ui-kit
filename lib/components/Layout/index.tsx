/**
 * @file
 * @copyright 2020 Aleksej Komarov
 * @license MIT
 */

import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
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
      className={clsx(['layout', className, computeBoxClassName(rest)])}
      {...computeBoxProps(rest)}
    >
      {children}
    </div>
  );
}

function LayoutContent(props: BoxProps) {
  const { className, children, ...rest } = props;

  return (
    <div className="layout-content-wrapper">
      <OverlayScrollbarsComponent
        defer
        options={{
          scrollbars: {
            autoHide: 'leave',
            autoHideSuspend: true,
            theme: '',
          },
        }}
        className={clsx([
          'layout-content',
          className,
          computeBoxClassName(rest),
        ])}
        {...computeBoxProps(rest)}
      >
        {children}
      </OverlayScrollbarsComponent>
    </div>
  );
}
Layout.Content = LayoutContent;
