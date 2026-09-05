import { COMPONENT_COLORS } from '@common/constants';
import { Button, Slider, Stack } from '@components';
import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof Slider>;
export default {
  component: Slider,
  title: 'Components/Slider',
} satisfies Meta<StoryProps>;

type PreviewProps = {
  color?: string;
  ranges?: Record<string, [number, number]>;
} & PropsWithChildren;

function SliderPreview(props: PreviewProps) {
  const [value, setValue] = useState(50);
  const { color, ranges } = props;

  return (
    <Stack.Item key={color} mt={5}>
      <Stack fill g={0.5}>
        <Button color={color} startIcon="angles-left" onClick={() => setValue(0)} />
        <Slider
          color={color}
          value={value}
          minValue={0}
          maxValue={100}
          width={15}
          ranges={ranges || { primary: [0, 50], secondary: [51, 100] }}
          onChange={(value) => setValue(value)}
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
        <SliderPreview />
      </Stack>
    );
  },
};

export const Colors = {
  render: () => {
    return (
      <Stack justify="center" wrap>
        {[...COMPONENT_COLORS.states, ...COMPONENT_COLORS.spectrum].map((color) => (
          <SliderPreview color={color} key={color} />
        ))}
      </Stack>
    );
  },
};

export const Ranges = {
  render: () => {
    return (
      <Stack justify="center">
        <SliderPreview ranges={{ average: [50, 75], bad: [75, 100], good: [0, 50] }} />
      </Stack>
    );
  },
};
