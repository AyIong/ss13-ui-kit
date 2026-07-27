import {
  autoUpdate,
  FloatingPortal,
  flip,
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
import clsx from 'clsx';
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  useEffect,
  useState,
} from 'react';
import { floatingRoot } from 'ss13-ui-kit/common/constants';
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
    allowedInsideClasses,
    allowedOutsideClasses,
    animationDuration,
    children,
    closeAfterInteract,
    content,
    contentAutoWidth,
    contentClasses,
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
      });
    },
  });

  const { isMounted, status } = useTransitionStatus(context, {
    // TODO: Calculate CSS var value
    duration: animationDuration || 200,
  });

  function isWhitelisted(event, className) {
    if (!className || !(event.target instanceof Element)) {
      return false;
    }

    const element = event.target;
    return element.closest(className);
  }

  const openHandled = handleOpen !== undefined;
  const interactionsEnabled = !disabled && !openHandled;
  const click = useClick(context, { enabled: interactionsEnabled });
  const hover = useHover(context, {
    enabled: interactionsEnabled,
    handleClose: hoverSafePolygon
      ? safePolygon({
          requireIntent: false,
        })
      : null,
    restMs: hoverDelay || 100,
  });
  const dismiss = useDismiss(context, {
    ancestorScroll: true,
    outsidePress: (event) => !isWhitelisted(event, allowedOutsideClasses),
  });

  const interactions = [dismiss, hoverOpen ? hover : click];
  const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

  const referenceProps = getReferenceProps({
    ref: refs.setReference,
    ...(stopChildPropagation && {
      onClick: (event) => event.stopPropagation(),
    }),
  });

  const floatingProps = getFloatingProps({
    onClick: (event) => {
      if (closeAfterInteract && !isWhitelisted(event, allowedInsideClasses)) {
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
      className={clsx([
        'floating',
        !animationDuration && 'animated',
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
          <FloatingPortal id={floatingRoot}>{floatingContent}</FloatingPortal>
        ))}
    </>
  );
}
