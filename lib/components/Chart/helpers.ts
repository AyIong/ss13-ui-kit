import { zip } from '@common/collections';
import type { Point, Range } from './types';

export function normalizeData(
  data: Point[],
  scale: number[],
  rangeX?: Range,
  rangeY?: Range,
): Point[] {
  if (data.length === 0) {
    return [];
  }

  const zipped = zip(...data);
  const min = zipped.map((p) => Math.min(...p));
  const max = zipped.map((p) => Math.max(...p));

  if (rangeX !== undefined) {
    min[0] = rangeX[0];
    max[0] = rangeX[1];
  }

  if (rangeY !== undefined) {
    min[1] = rangeY[0];
    max[1] = rangeY[1];
  }

  const normalized = data.map((point) =>
    zip(point, min, max, scale).map(
      ([value, min, max, scale]) => ((value - min) / (max - min)) * scale,
    ),
  );

  return normalized;
}

export function dataToPolylinePoints(data: Point[]): string {
  let points = '';
  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    points += `${point[0]},${point[1]} `;
  }
  return points;
}
