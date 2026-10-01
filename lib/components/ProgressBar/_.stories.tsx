import { CSS_COLORS, type CssColors } from '@common/constants';
import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { ProgressBar } from '.';

type StoryProps = ComponentProps<typeof ProgressBar>;
export default {
  component: ProgressBar,
  title: 'Components/ProgressBar',
} satisfies Meta<StoryProps>;

type PreviewProps = {
  color?: CssColors;
  vertical?: boolean;
  compact?: boolean;
  ranges?: Record<string, [number, number]>;
} & PropsWithChildren;

function ProgressBarPreview(props: PreviewProps) {
  const [value, setValue] = useState(50);
  const { color, ranges, vertical, compact } = props;

  return (
    <Stack.Item key={color} width={!vertical && 15} height={vertical && 15}>
      <Stack fill g={0.5}>
        <Button color={color} startIcon="angles-left" onClick={() => setValue(0)} />
        <ProgressBar
          vertical={vertical}
          compact={compact}
          color={color}
          value={value}
          minValue={0}
          maxValue={100}
          ranges={ranges}
        />
        <Button color={color} startIcon="angles-right" onClick={() => setValue(100)} />
      </Stack>
    </Stack.Item>
  );
}

export const Default = {
  render: () => {
    return (
      <Stack justify="center">
        <ProgressBarPreview />
      </Stack>
    );
  },
};

export const Compact = {
  render: () => {
    return (
      <Stack justify="center">
        <ProgressBarPreview compact />
      </Stack>
    );
  },
};

export const Vertical = {
  render: () => {
    return (
      <Stack justify="center">
        <ProgressBarPreview vertical />
      </Stack>
    );
  },
};

export const Colors = {
  render: () => {
    return (
      <Stack justify="center" wrap>
        {CSS_COLORS.map((color) => (
          <ProgressBarPreview color={color} key={color} />
        ))}
      </Stack>
    );
  },
};

export const Ranges = {
  render: () => {
    return (
      <Stack justify="center">
        <ProgressBarPreview ranges={{ average: [50, 75], bad: [75, 100], good: [0, 50] }} />
      </Stack>
    );
  },
};
