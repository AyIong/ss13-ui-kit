/**
 * @file
 * @copyright 2020 Aleksej Komarov
 * @license MIT
 */

import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect } from 'react';
import { osOptions, uiRootId } from 'tgui-modern/common/constants';
import { classes } from 'tgui-modern/common/react';
import type { BoxProps } from '../Box/types';
import { Toaster } from '../Toast';
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
      className={classes('layout', className, computeBoxClassName(rest))}
      {...computeBoxProps(rest)}
    >
      {children}
    </div>
  );
}

function LayoutContent(props: BoxProps) {
  const { className, children, ...rest } = props;
  return (
    <div id={uiRootId} className="layout-content-wrapper">
      <Toaster />
      <OverlayScrollbarsComponent
        defer
        className={classes('layout-content', className, computeBoxClassName(rest))}
        {...osOptions}
        {...computeBoxProps(rest)}
      >
        {children}
      </OverlayScrollbarsComponent>
    </div>
  );
}
Layout.Content = LayoutContent;
