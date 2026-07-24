import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { ColorBox } from '.';

type StoryProps = ComponentProps<typeof ColorBox>;

export default {
  component: ColorBox,
  title: 'Components/ColorBox',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    color: 'red',
    content: 'R',
  },
};

export const Status: Story = {
  render: () => (
    <>
      <ColorBox color="green" content="✔" />
      <ColorBox color="red" content="✘" />
      <ColorBox color="yellow" content="!" />
    </>
  ),
};

export const Swatch: Story = {
  args: {
    color: 'blue',
  },
};
