import { type PropsWithChildren, useLayoutEffect, useRef } from 'react';

/**
 * ## Autofocus
 *
 * Used to force the window to steal focus on load. Children optional.
 */
export function Autofocus(props: PropsWithChildren) {
  const { children } = props;
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div ref={ref} tabIndex={-1}>
      {children}
    </div>
  );
}
