import { debounce } from '@common/timer';
import { computeBoxProps } from '@common/ui';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { globalEvents } from 'tgui-core/common/events';
import { resizeInterval } from './constants';
import { createByondUiElement, getBoundingBox, unmountByondUiElements } from './helpers';
import type { ByondUiProps } from './types';

/**
 * ## ByondUi
 *
 * Displays a BYOND UI element on top of the browser, and leverages browser's
 * layout engine to position it just like any other HTML element. It is
 * especially useful if you want to display a secondary game map in your
 * interface.
 *
 * Note that you may need to call globalEvents.emit("window-geometry-finished")
 * if you are not using the Window component.
 *
 * Example:
 *
 * ```tsx
 * <ByondUi
 *   params={{
 *    id: 'test_button', // optional, can be auto-generated
 *    parent: 'some_container', // optional, defaults to the current window
 *    type: 'button',
 *    text: 'Hello, world!',
 *   }} />
 * ```
 *
 * Example:
 *
 * ```tsx
 * <ByondUi
 *   params={{
 *    id: 'test_map',
 *    type: 'map',
 *   }} />
 * ```
 *
 * It supports a full set of `Box` properties for layout purposes.
 *
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function ByondUi(props: ByondUiProps) {
  const { params, phonehome, ...rest } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const byondUiElement = useRef(createByondUiElement(params?.id, phonehome));

  function updateRender() {
    const element = containerRef.current;
    if (!element) return;

    const box = getBoundingBox(element);
    byondUiElement.current.render({
      parent: Byond.windowId,
      ...params,
      pos: `${box.pos[0]},${box.pos[1]}`,
      size: `${box.size[0]}x${box.size[1]}`,
    });
  }

  const handleResize = debounce(() => {
    updateRender();
  }, resizeInterval);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    globalEvents.on('window-geometry-finished', handleResize);

    // This can cause a double winset, but prevents any weird cases like where
    // this gets mounted after Window.
    updateRender();
    return () => {
      window.removeEventListener('resize', handleResize);
      globalEvents.off('window-geometry-finished', handleResize);
      byondUiElement.current.unmount();
    };
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('beforeunload', unmountByondUiElements);
    return () => {
      window.removeEventListener('beforeunload', unmountByondUiElements);
    };
  }, []);

  return (
    <div ref={containerRef} {...computeBoxProps(rest)}>
      {/* Filler */}
      <div style={{ minHeight: '22px' }} />
    </div>
  );
}
