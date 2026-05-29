import clsx from 'clsx';
import {
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
  useRef,
} from 'react';
import { TitleBar } from 'ss13-ui-kit/components/index';
import { Layout } from 'ss13-ui-kit/components/Layout/index';

type Props = Partial<{
  canClose: boolean;
  height: number;
  title: string;
  width: number;
  showDimmer: boolean;
  buttons: ReactNode;
}> &
  PropsWithChildren;

export function Window(props: Props) {
  const {
    canClose = true,
    width = 375,
    height = 500,
    children,
    buttons,
    showDimmer,
    title = 'Mock Window',
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <Layout ref={ref} style={{ height, width }}>
      <TitleBar title={title} canClose={canClose}>
        {buttons}
      </TitleBar>
      <Layout.Content className={clsx([showDimmer && 'dimmed'])}>
        {children}
      </Layout.Content>
      {/* Resize handlers */}
      <ResizeHandler targetRef={ref} axis="x" />
      <ResizeHandler targetRef={ref} axis="y" />
      <ResizeHandler targetRef={ref} axis="both" />
    </Layout>
  );
}

type WindowContentProps = Partial<{
  className: string;
  fitted: boolean;
}> &
  PropsWithChildren;

export function WindowContent(props: WindowContentProps) {
  const { children, className, fitted, ...rest } = props;
  return (
    <div className={clsx(['window-content', className])} {...rest}>
      {fitted ? children : <div className="window-padding">{children}</div>}
    </div>
  );
}
Window.Content = WindowContent;

type ResizerProps = {
  axis: 'x' | 'y' | 'both';
  targetRef: RefObject<HTMLDivElement | null>;
};

function ResizeHandler(props: ResizerProps) {
  const { targetRef, axis } = props;

  const refWidth = useRef<number>(0);
  const refHeight = useRef<number>(0);
  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);

  function handleDragStart(event: React.MouseEvent<HTMLDivElement>): void {
    if (!targetRef.current) {
      return;
    }

    refWidth.current = targetRef.current.offsetWidth;
    refHeight.current = targetRef.current.offsetHeight;
    dragStartX.current = event.clientX;
    dragStartY.current = event.clientY;

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.documentElement.classList.add(`resizing-${axis}`);
  }

  function handleDragMove(event: MouseEvent) {
    if (!targetRef.current) {
      return;
    }

    const deltaX = event.clientX - dragStartX.current;
    const deltaY = event.clientY - dragStartY.current;

    if (axis === 'x' || axis === 'both') {
      targetRef.current.style.width = `${refWidth.current + deltaX}px`;
    }

    if (axis === 'y' || axis === 'both') {
      targetRef.current.style.height = `${refHeight.current + deltaY}px`;
    }
  }

  function handleDragEnd() {
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.documentElement.classList.remove(`resizing-${axis}`);
  }

  return (
    <div className={`resize-handler ${axis}`} onMouseDown={handleDragStart} />
  );
}
