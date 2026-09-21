import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Stack } from '../Stack';
import { Confirm } from '.';

type StoryProps = ComponentProps<typeof Confirm>;

export default {
  component: Confirm,
  title: 'Components/Confirm',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: 'Hold me',
    confirmedIcon: 'square-check',
    confirmedContent: 'Confirmed',
    fluid: false,
    disabled: false,
  },
  render: (args) => {
    const [confirmed, setConfirmed] = useState(false);
    return (
      <Stack>
        <Stack.Item grow>
          <Confirm onClick={() => setConfirmed(!confirmed)} {...args} />
        </Stack.Item>
        <Stack.Item>{confirmed ? 'Confirmed' : 'Confirm'}</Stack.Item>
      </Stack>
    );
  },
};
