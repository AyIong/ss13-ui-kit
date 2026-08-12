import { Button, FitText, Input, Section, Stack } from '@components';
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
    const [storyText, setStoryText] = useState('You can change text');
    return (
      <Section
        width={12.5}
        height={7.5}
        buttons={
          <Input
            fluid
            value={storyText}
            onChange={(value) => setStoryText(value)}
          />
        }
      >
        <Stack vertical>
          <Stack.Item>
            <FitText maxFontSize={'16px'}>{storyText}</FitText>
          </Stack.Item>
          <Stack.Item>
            <Button fluid>
              <FitText ellipsis>{storyText}</FitText>
            </Button>
          </Stack.Item>
        </Stack>
      </Section>
    );
  },
};
