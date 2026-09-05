import { Divider, FitText, Input, Section } from '@components';
import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof FitText>;

export default {
  component: FitText,
  title: 'Components/FitText',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    const [storyText, setStoryText] = useState('Text will automatically fit container');
    return (
      <Section
        fill
        width={12.5}
        height={15}
        buttons={<Input fluid value={storyText} onChange={(value) => setStoryText(value)} />}
      >
        With Ellipsis
        <FitText ellipsis>{storyText}</FitText>
        <Divider />
        Without ellipsis
        <FitText>{storyText}</FitText>
      </Section>
    );
  },
};
