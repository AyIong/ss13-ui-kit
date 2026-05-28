import { Stack, Tooltip } from '@components';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof Tooltip>;

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: '6px',
        }}
      >
        <HoverBox position="top-start" />
        <HoverBox position="top" />
        <HoverBox position="top-end" />
        <HoverBox position="left" />
        <Tooltip content={false && 'Tooltip'}>
          <div style={{ border: 'thin solid red', padding: '6px' }}>
            My content is falsy
          </div>
        </Tooltip>
        <HoverBox position="right" />
        <HoverBox position="bottom-start" />
        <HoverBox position="bottom" />
        <HoverBox position="bottom-end" />
      </div>
    );
  },
};

function HoverBox(props) {
  const { position } = props;
  return (
    <Tooltip content="Tooltip content example" position={position}>
      <div style={{ border: 'thin solid green', padding: '6px' }}>
        {position}
      </div>
    </Tooltip>
  );
}
