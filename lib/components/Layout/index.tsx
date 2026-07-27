/**
 * @file
 * @copyright 2020 Aleksej Komarov
 * @license MIT
 */

import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useScrollable } from 'ss13-ui-kit/hooks/useScrollable';
import type { BoxProps } from '../Box/types';
import type { LayoutProps } from './types';

export function Layout(props: LayoutProps) {
  const {
    className,
    theme = 'nanotrasen',
    colorScheme = 'night',
    children,
    ...rest
  } = props;

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
  const layoutRef = useRef(null);

  // Initialize scrollbar
  useScrollable(layoutRef);

  return (
    <div ref={layoutRef} id="layout-root" className="layout-content-wrapper">
      <div
        className={clsx([
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
