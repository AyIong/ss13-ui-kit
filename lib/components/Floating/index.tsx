import { classes } from '@common/react';
import {
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStatus,
} from '@floating-ui/react';
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import type { FloatingProps } from './types';

/**
 * ## Floating
 *
 *  Floating lets you position elements so that they don't go out of the bounds of the window.
 *
 * - [Documentation](https://floating-ui.com/docs/react) for more information.
 */
export function Floating(props: FloatingProps) {
  const {
    ref,
    allowedOutsideClasses,
    animationDuration,
    children,
    closeAfterInteract,
    content,
    contentAutoWidth,
    contentClasses,
    contentOffset = 6,
    contentStyles,
    disabled,
    hoverDelay,
    hoverOpen,
    hoverSafePolygon,
    handleOpen,
    onMounted,
    placement,
    preventPortal,
    stopChildPropagation,
    onOpenChange,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    middleware: [
      offset(contentOffset),
      flip({ padding: 6 }),
      shift(),
      contentAutoWidth &&
        size({
          apply({ rects, elements }) {
            elements.floating.style.width = `${rects.reference.width}px`;
          },
        }),
    ],
    onOpenChange(isOpen) {
      setIsOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    open: isOpen,
    placement: placement || 'bottom',
    transform: false, // More expensive but allows to use transform for animations
    whileElementsMounted: (reference, floating, update) => {
      if (onMounted !== undefined) {
        onMounted();
      }
      return autoUpdate(reference, floating, update, {
        ancestorResize: false,
        ancestorScroll: false,
        elementResize: false, // ResizeObserver crashes in multiple cases, disabled for now
      });
    },
  });

  // ref may be a forwarded ref for imperative control; provide a properly-typed handle
  useImperativeHandle(ref as React.Ref<{ close: () => void } | null>, () => ({
    close: () => context.onOpenChange(false),
  }));

  const { isMounted, status } = useTransitionStatus(context, {
    duration: animationDuration || 200,
  });

  const dismiss = useDismiss(context, {
    ancestorScroll: true,
    outsidePress: (event) =>
      !allowedOutsideClasses
        ? true
        : event.target instanceof Element &&
          !event.target.closest(allowedOutsideClasses),
  });

  const click = useClick(context, { enabled: !disabled });
  const hover = useHover(context, {
    enabled: !disabled,
    restMs: hoverDelay || 200,
    handleClose: hoverSafePolygon
      ? safePolygon({
          requireIntent: false,
        })
      : null,
  });

  const openHandled = handleOpen !== undefined;
  const interactions = openHandled ? [] : [dismiss, hoverOpen ? hover : click];
  const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

  const referenceProps = getReferenceProps({
    ref: refs.setReference,
    ...(stopChildPropagation && {
      onClick: (event) => event.stopPropagation(),
    }),
  });

  const floatingProps = getFloatingProps({
    onClick: () => {
      if (closeAfterInteract) {
        context.onOpenChange(false);
      }
    },
    ref: refs.setFloating,
  });

  useEffect(() => {
    if (openHandled) {
      context.onOpenChange(handleOpen);
    }
  }, [handleOpen]);

  // Generate our children which will be used as reference
  let floatingChildren: ReactElement;
  if (isValidElement(children)) {
    floatingChildren = cloneElement(children as ReactElement, referenceProps);
  } else {
    floatingChildren = <div {...referenceProps}>{children}</div>;
  }

  const floatingContent = (
    <div
      ref={refs.setFloating}
      className={classes([
        'Floating',
        !animationDuration && 'Floating--animated',
        contentClasses,
      ])}
      data-position={context.placement}
      data-transition={status}
      style={{ ...floatingStyles, ...contentStyles }}
      {...floatingProps}
    >
      {content}
    </div>
  );

  return (
    <>
      {floatingChildren}
      {isMounted &&
        !!content &&
        (preventPortal ? (
          floatingContent
        ) : (
          <FloatingPortal id="tgui-root">{floatingContent}</FloatingPortal>
        ))}
    </>
  );
}
