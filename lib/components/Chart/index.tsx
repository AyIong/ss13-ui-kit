import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import { computeBoxProps } from 'ss13-ui-kit/common/ui';
import { dataToPolylinePoints, normalizeData } from './helpers';
import type { ChartProps, ViewBox } from './types';

/**
 * ## Chart
 *
 * A simple chart component that displays a polyline based on the provided data.
 *
 * It normalizes the data to fit within the viewBox dimensions.
 *
 * - [View inherited Box Props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function Chart(props: ChartProps) {
  const { data = [], rangeX, rangeY, color, strokeWidth, ...rest } = props;

  const innerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState<ViewBox>([600, 200]);

  const normalized = normalizeData(data, viewBox, rangeX, rangeY);
  const strokeWidthToUse = strokeWidth || 2;

  // Push data outside viewBox and form a fillable polygon
  if (normalized.length > 0) {
    const first = normalized[0];
    const last = normalized[normalized.length - 1];
    normalized.push([viewBox[0] + strokeWidthToUse, last[1]]);
    normalized.push([viewBox[0] + strokeWidthToUse, -strokeWidthToUse]);
    normalized.push([-strokeWidthToUse, -strokeWidthToUse]);
    normalized.push([-strokeWidthToUse, first[1]]);
  }

  const points = dataToPolylinePoints(normalized);
  function handleResize(): void {
    const element = innerRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    setViewBox([rect.width, rect.height]);
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={innerRef}
      className={clsx('chart', `bg-${color ? color : 'primary'}`)}
      {...computeBoxProps(rest)}
    >
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
      >
        <polyline points={points} strokeWidth={strokeWidthToUse} />
      </svg>
    </div>
  );
}
