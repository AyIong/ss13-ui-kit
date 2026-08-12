import { afterEach, describe, expect, it, spyOn } from 'bun:test';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Chart } from '.';

describe('Chart Component', () => {
  afterEach(cleanup);

  const mockData = [
    [0, 0],
    [50, 50],
    [100, 100],
  ];

  it('renders a polyline with correct stroke width', () => {
    const { container } = render(
      <Chart.Line data={mockData} strokeWidth={5} />,
    );
    const polyline = container.querySelector('polyline')!;
    expect(polyline.getAttribute('stroke-width')).toBe('5');
  });

  it('updates viewBox on window resize', () => {
    // getBoundingClientRect just returns 0s, so we have to mock it
    const spy = spyOn(
      HTMLDivElement.prototype,
      'getBoundingClientRect',
    ).mockReturnValue({
      width: 800,
      height: 400,
      top: 0,
      left: 0,
      bottom: 400,
      right: 800,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const { container } = render(<Chart.Line data={mockData} />);

    // trigger resize and expect it to have changed
    fireEvent(window, new Event('resize'));

    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('viewBox')).toBe('0 0 800 400');

    spy.mockRestore();
  });

  it('normalizes points within the viewBox', () => {
    const spy = spyOn(
      HTMLDivElement.prototype,
      'getBoundingClientRect',
    ).mockReturnValue({
      width: 600,
      height: 200,
      top: 0,
      left: 0,
      bottom: 200,
      right: 600,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect);

    const { container } = render(
      <Chart.Line
        data={[
          [0, 0],
          [10, 10],
        ]}
        rangeX={[0, 10]}
        rangeY={[0, 10]}
        strokeWidth={0}
      />,
    );

    const polyline = container.querySelector('polyline')!;
    const pointsAttr = polyline.getAttribute('points')!;
    const pointsArray = pointsAttr.trim().split(' ');

    expect(pointsArray).toContain('0,0');
    expect(pointsArray).toContain('600,200');

    spy.mockRestore();
  });

  it('adds padding points to create a fillable polygon', () => {
    const { container } = render(
      <Chart.Line
        data={[
          [0, 0],
          [100, 100],
        ]}
      />,
    );
    const polyline = container.querySelector('polyline')!;
    const points = polyline.getAttribute('points')!.trim().split(' ');

    expect(points.length).toBe(6);
  });

  it('handles empty data without crashing', () => {
    const { container } = render(<Chart.Line data={[]} />);
    const polyline = container.querySelector('polyline')!;
    expect(polyline.getAttribute('points')).toBe('');
  });
});
