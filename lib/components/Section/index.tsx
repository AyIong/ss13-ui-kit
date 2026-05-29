import { canRender } from '@common/react';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { useEffect, useRef } from 'react';
import type { SectionProps } from './types';
/**
 * ## Section
 *
 * Section is a surface that displays content and actions on a single topic.
 *
 * They should be easy to scan for relevant and actionable information.
 * Elements, like text and images, should be placed in them in a way that
 * clearly indicates hierarchy.
 *
 * Sections can now be nested, and will automatically font size of the
 * header according to their nesting level. Previously this was done via `level`
 * prop, but now it is automatically calculated.
 *
 * Section can also be titled to clearly define its purpose.
 *
 * Example:
 *
 * ```tsx
 * <Section title="Cargo">Here you can order supply crates.</Section>
 * ```
 *
 * If you want to have a button on the right side of an section title
 * (for example, to perform some sort of action), there is a way to do that:
 *
 * Example:
 *
 * ```tsx
 * <Section title="Cargo" buttons={<Button>Send shuttle</Button>}>
 *   Here you can order supply crates.
 * </Section>
 * ```
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-section--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function Section(props: SectionProps) {
  const {
    buttons,
    children,
    className,
    container_id,
    fill,
    fitted,
    flexGrow,
    noTopPadding,
    onScroll,
    ref,
    scrollable,
    stretchContents,
    title,
    ...rest
  } = props;

  const hasTitle = canRender(title) || canRender(buttons);
  const ourRef = useRef<HTMLDivElement>(null);
  const nodeRef = ref || ourRef;
  const [initialize, instance] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        autoHide: 'leave',
        autoHideSuspend: true,
        theme: '',
      },
    },
  });

  useEffect(() => {
    const osInstance = instance();
    const osState = osInstance?.state();
    const osNotInitialized = !osInstance || osState?.destroyed;

    // Initialize OS if section scrollable
    if (osNotInitialized && scrollable) {
      initialize(nodeRef.current as HTMLDivElement);
    }

    // Destroy OS and remove nodes if section not scrollable
    // Will not be executed if section without scrollable initialy
    // That's for the dynamic scrollable prop behavior, which is
    // not standart case, but... it makes me calmer
    if (osInstance && !scrollable) {
      osInstance?.destroy();
    }
  }, [scrollable, initialize]);

  return (
    <section
      id={container_id}
      className={clsx([
        'section',
        fill && 'fill',
        fitted && 'fitted',
        flexGrow && 'flex-grow',
        className,
        computeBoxClassName(rest),
      ])}
      {...computeBoxProps(rest)}
    >
      {hasTitle && (
        <div className="section-title">
          <div className="left-side">{title}</div>
          <div className="right-side">{buttons}</div>
        </div>
      )}
      <div className={clsx(['section-content-wrapper'])}>
        <div
          // For posterity: the forwarded ref needs to be here specifically
          // to actually let things interact with the scrolling.
          ref={nodeRef}
          className={clsx([
            'section-content',
            scrollable && 'scrollable',
            stretchContents && 'stretch-contents',
            noTopPadding && 'no-top-padding',
          ])}
          onScroll={onScroll}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
