import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { AnimatedNumber } from '.';

type StoryProps = ComponentProps<typeof AnimatedNumber>;

export default {
  component: AnimatedNumber,
  title: 'Components/AnimatedNumber',
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

function getRandom(): number {
  return Math.round(Math.random() * 100 * 100) / 100;
}

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(100);

    return (
      <Stack>
        <Stack.Item>
          <Button onClick={() => setValue(getRandom())}>Change Value</Button>
        </Stack.Item>
        <Stack.Item>
          <AnimatedNumber initial={0} value={value} />
        </Stack.Item>
      </Stack>
    );
  },
};
