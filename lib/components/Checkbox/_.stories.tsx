import { COMPONENT_COLORS } from '@common/constants';
import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Checkbox } from '.';

type StoryProps = ComponentProps<typeof Checkbox>;

export default {
  component: Checkbox,
  title: 'Components/Checkbox',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: 'Click me',
    fluid: false,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        onClick={() => setChecked(!checked)}
        {...args}
      />
    );
  },
};

export const Colors: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div>
        {[...COMPONENT_COLORS.states, ...COMPONENT_COLORS.spectrum].map(
          (color) => (
            <Checkbox
              key={color}
              color={color}
              checked={checked}
              onClick={() => setChecked(!checked)}
            >
              {color}
            </Checkbox>
          ),
        )}
      </div>
    );
  },
};
