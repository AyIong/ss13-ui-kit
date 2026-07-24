import { COMPONENT_COLORS } from '@common/constants';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Stack } from '../Stack';
import { Button } from '.';

type StoryProps = ComponentProps<typeof Button>;

export default {
  component: Button,
  title: 'Components/Button',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

const buttonArgs: StoryProps = {
  children: 'Button',
  fluid: false,
  circular: false,
  selected: false,
  disabled: false,
  variant: 'filled',
  startIcon: 'xmark',
  endIcon: { name: 'xmark', animation: { fade: true } },
};

export const Default: Story = {
  args: buttonArgs,
  render: (args) => {
    return <Button {...args} />;
  },
};

export const Colors: Story = {
  args: buttonArgs,
  render: (args) => (
    <Stack vertical>
      {[...COMPONENT_COLORS.states, ...COMPONENT_COLORS.spectrum].map(
        (color) => (
          <Button key={color} color={color} {...args}>
            {color}
          </Button>
        ),
      )}
    </Stack>
  ),
};
