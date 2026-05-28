import { TitleBar } from '@components';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof TitleBar>;

export default {
  component: TitleBar,
  title: 'Components/TitleBar',
  tags: ['autodocs'],
  argTypes: {
    status: {
      options: [undefined, 0, 1, 2],
      control: {
        type: 'radio',
        labels: {
          0: 'Static',
          1: 'Visible',
          2: 'Interactive',
        },
      },
    },
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    title: 'Hello, world!',
    canClose: true,
    status: 2,
  },
  render: (args) => {
    return <TitleBar styles={{ width: '300px' }} {...args} />;
  },
};
