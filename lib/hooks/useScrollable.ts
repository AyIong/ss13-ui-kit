import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { type RefObject, useEffect, useRef } from 'react';

type UseScrollableProps = Partial<{
  // If passed false, scrollbar will be nuked
  scrollable: boolean;
}>;

export function useScrollable(
  ref?: RefObject<HTMLDivElement | null>,
  props: UseScrollableProps = {},
) {
  const { scrollable = true } = props;
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      scrollbars: {
        autoHide: 'leave',
        autoHideSuspend: true,
        theme: '',
      },
    },
  });

  const viewportRef = useRef<HTMLDivElement | null>(null);
  function isScrollbarInitialized() {
    const osInstance = instance();
    return !!osInstance && !osInstance.state().destroyed;
  }

  useEffect(() => {
    // Destroy OS and remove nodes if scrollable falsy or has no ref
    // That's for the dynamic scrollable prop behavior and sanity,
    // first is one not standart case, but... it makes me calmer
    if (!scrollable || !ref) {
      // If instance alredy created, nuke it.
      // Prob overkill...
      if (isScrollbarInitialized()) {
        instance()?.destroy();
      }

      viewportRef.current = null;
      return;
    }

    // Initialize OS if hook used with scrollable true
    if (!isScrollbarInitialized() && ref.current) {
      initialize(ref.current as HTMLDivElement);
      viewportRef.current =
        (instance()?.elements()?.viewport as HTMLDivElement) || null;
    }

    return () => {
      // OverlayScrollbars hook automatically destroys instance on component unmount
      // But for safety we check if it really destroyed, also scrollable change need
      // to be handled
      if (isScrollbarInitialized()) {
        instance()?.destroy();
      }
      viewportRef.current = null;
    };
  }, [scrollable, ref]);
  return viewportRef;
}
