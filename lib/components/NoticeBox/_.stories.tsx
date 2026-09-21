import { CSS_COLORS } from '@common/constants';
import { NoticeBox, Stack } from '@components';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof NoticeBox>;

export default {
  component: NoticeBox,
  title: 'Components/NoticeBox',
  argTypes: {
    children: { control: 'text' },
    color: {
      control: 'select',
      options: [undefined, CSS_COLORS],
    },
    info: { control: 'boolean' },
    success: { control: 'boolean' },
    warning: { control: 'boolean' },
    danger: { control: 'boolean' },
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  args: {
    children: 'NoticeBox',
  },
};

export const BaseTypes: Story = {
  render: () => (
    <Stack vertical>
      <NoticeBox>Default notice</NoticeBox>
      <NoticeBox info>Info notice</NoticeBox>
      <NoticeBox success>Success notice</NoticeBox>
      <NoticeBox warning>Warning notice</NoticeBox>
      <NoticeBox danger>Danger notice</NoticeBox>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack vertical>
      {CSS_COLORS.map((color) => (
        <NoticeBox color={color} key={color}>
          {color || 'default'}
        </NoticeBox>
      ))}
    </Stack>
  ),
};
