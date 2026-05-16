import { BlockQuote } from '@components';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof BlockQuote>;

export default {
  component: BlockQuote,
  title: 'Components/BlockQuote',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <BlockQuote>Quote Block</BlockQuote>
        <BlockQuote>The quick brown fox jumps over the lazy dog.</BlockQuote>
      </>
    );
  },
};
