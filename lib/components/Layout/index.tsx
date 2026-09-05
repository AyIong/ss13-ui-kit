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

  // Fuck that. This error is useless and absolutely RANDOM.
  // It doesn't broke anything, so we don't need error that brokes UI
  // just to inform devs, let's ignore that.
  //
  // This is the only exception, and it does not mean that other errors
  // can and should be suppressed in this way, they must be fixed.
  useEffect(() => {
    function suppressResizeObserverError(event) {
      if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
        event.stopImmediatePropagation();
      }
    }

    window.addEventListener('error', suppressResizeObserverError);
    return () => {
      window.removeEventListener('error', suppressResizeObserverError);
    };
  }, []);

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
