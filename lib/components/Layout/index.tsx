/**
 * @file
 * @copyright 2020 Aleksej Komarov
 * @license MIT
 */

import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect } from 'react';
import { osOptions } from 'tgui-core/common/constants';
import type { BoxProps } from '../Box/types';
import type { LayoutProps } from './types';

export function Layout(props: LayoutProps) {
  const { className, theme = 'nanotrasen', colorScheme = 'night', children, ...rest } = props;

  const themeClass = `theme-${theme} pref-${colorScheme}`;
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
    <div id="layout-root" className="layout-content-wrapper">
      <OverlayScrollbarsComponent
        defer
        className={clsx(['layout-content', className, computeBoxClassName(rest)])}
        {...osOptions}
        {...computeBoxProps(rest)}
      >
        {children}
      </OverlayScrollbarsComponent>
    </div>
  );
}
Layout.Content = LayoutContent;
