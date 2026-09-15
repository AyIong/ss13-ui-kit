import { byondUiStack } from './constants';
import type { BoundingBox, ByondUiElement, SampleByondParams } from './types';

/**
 * Cleanly unmount all visible UI elements
 */
export function unmountByondUiElements() {
  for (let index = 0; index < byondUiStack.length; index++) {
    const id = byondUiStack[index];
    if (typeof id === 'string') {
      byondUiStack[index] = null;
      Byond.winset(id, {
        parent: '',
      });
    }
  }
}

/**
 * Get the bounding box of the DOM element in display-pixels.
 */
export function getBoundingBox(element: HTMLDivElement): BoundingBox {
  const pixelRatio = window.devicePixelRatio ?? 1;
  const rect = element.getBoundingClientRect();

  return {
    pos: [rect.left * pixelRatio, rect.top * pixelRatio],
    size: [(rect.right - rect.left) * pixelRatio, (rect.bottom - rect.top) * pixelRatio],
  };
}

export function createByondUiElement(
  elementId: string | undefined,
  phonehome: boolean = true,
): ByondUiElement {
  // Reserve an index in the stack
  const index = byondUiStack.length;
  byondUiStack.push(null);
  // Get a unique id
  const id = elementId || `byondui_${index}`;

  // Return a control structure
  return {
    render: (params: SampleByondParams) => {
      if (phonehome) Byond.sendMessage('renderByondUi', { renderByondUi: id });

      byondUiStack[index] = id;
      Byond.winset(id, params);
    },
    unmount: () => {
      if (phonehome) Byond.sendMessage('unmountByondUi', { renderByondUi: id });

      byondUiStack[index] = null;
      Byond.winset(id, {
        parent: '',
      });
    },
  } as ByondUiElement;
}
