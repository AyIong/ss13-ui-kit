import { Button, Collapsible, Stack } from '@components';
import type { ComponentProps } from 'react';
import { COMPONENT_COLORS } from 'ss13-ui-kit/common/constants';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof Collapsible>;

export default {
  component: Collapsible,
  title: 'Components/Collapsible',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

const collapsibleArgs: StoryProps = {
  title: 'Click me',
  children: 'Collapsed content',
  startIcon: 'cog',
  endIcon: 'cog',
};

export const Default: Story = {
  args: collapsibleArgs,
};

export const Colors: Story = {
  args: collapsibleArgs,
  render: (args) => (
    <Stack vertical>
      {[...COMPONENT_COLORS.states, ...COMPONENT_COLORS.spectrum].map(
        (color) => (
          <Collapsible key={color} color={color} {...args}>
            {color}
          </Collapsible>
        ),
      )}
    </Stack>
  ),
};

export const WithButtons: Story = {
  args: collapsibleArgs,

  render: (args) => (
    <Collapsible {...args} buttons={<Button>Button</Button>} open />
  ),
};
