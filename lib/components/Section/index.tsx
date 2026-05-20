import { canRender, classes } from '@common/react';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { useRef } from 'react';
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
    scrollableHorizontal,
    stretchContents,
    title,
    ...rest
  } = props;

  const hasTitle = canRender(title) || canRender(buttons);
  const ourRef = useRef<HTMLDivElement>(null);
  const nodeRef = ref || ourRef;

  return (
    <section
      id={container_id}
      className={classes([
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
          <span className="text">{title}</span>
          <div className="buttons">{buttons}</div>
        </div>
      )}
      <div className={classes(['section-content-wrapper'])}>
        <div
          // For posterity: the forwarded ref needs to be here specifically
          // to actually let things interact with the scrolling.
          ref={nodeRef}
          className={classes([
            'section-content',
            scrollable && 'scrollable',
            scrollableHorizontal && 'scrollable-horizontal',
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
