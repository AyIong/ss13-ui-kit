import { type ComponentProps, useEffect, useState } from 'react';
import { COMPONENT_COLORS } from 'ss13-ui-kit/common/constants';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Stack } from '../Stack';
import { Chart } from '.';

type StoryProps = ComponentProps<typeof Chart>;

export default {
  component: Chart,
  title: 'Components/Chart',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

function useRandomChart() {
  const [chartData, setChartData] = useState<number[][]>([
    [0, 50],
    [10, 55],
    [20, 48],
    [30, 60],
    [40, 52],
    [50, 65],
    [60, 58],
    [70, 70],
    [80, 62],
    [90, 75],
    [100, 68],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((data) => {
        const lastY = data[data.length - 1][1];
        const nextY = Math.max(
          0,
          Math.min(100, lastY + (Math.random() - 0.5) * 20),
        );

        return [...data.slice(1).map(([x, y]) => [x - 10, y]), [100, nextY]];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return chartData;
}

export const Default: Story = {
  render: () => {
    const chartData = useRandomChart();

    return (
      <Stack width={30}>
        <Stack.Item grow>
          <Chart data={chartData} rangeX={[0, 100]} rangeY={[0, 100]} />
        </Stack.Item>
      </Stack>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const chartData = useRandomChart();

    return (
      <Stack wrap="balance">
        {[...COMPONENT_COLORS.states, ...COMPONENT_COLORS.spectrum].map(
          (color) => (
            <Stack.Item key={color} grow>
              <Chart
                color={color}
                data={chartData}
                rangeX={[0, 100]}
                rangeY={[0, 100]}
              />
            </Stack.Item>
          ),
        )}
      </Stack>
    );
  },
};
