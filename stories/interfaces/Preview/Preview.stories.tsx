import type { ComponentProps } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Preview } from './ui';

type StoryProps = ComponentProps<typeof Preview>;

export default {
  component: Preview,
  title: 'Interfaces/Preview',
  tags: ['!autodocs'],
} satisfies Meta<StoryProps>;

export const Default = {
  render: () => {
    return <Preview />;
  },
};
