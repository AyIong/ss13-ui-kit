import { COMPONENT_COLORS } from '@common/constants';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Button } from '.';

type StoryProps = ComponentProps<typeof Button>;

export default {
  component: Button,
  title: 'Components/Buttons',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: 'Button',
    fluid: false,
    circular: false,
    selected: false,
    disabled: false,
    leadingIcon: { name: 'xmark' },
    trailingIcon: { name: 'xmark' },
  },
  render: (args) => {
    return <Button {...args} />;
  },
};

export const Colors: Story = {
  render: () => (
    <div>
      {[...COMPONENT_COLORS.states, ...COMPONENT_COLORS.spectrum].map(
        (color) => (
          <Button key={color} color={color}>
            {color}
          </Button>
        ),
      )}
    </div>
  ),
};
