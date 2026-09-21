import { CSS_COLORS, CssColors } from '@common/constants';
import { Button, Knob, Section, Stack } from '@components';
import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof Knob>;
export default {
  component: Knob,
  title: 'Components/Knob',
} satisfies Meta<StoryProps>;

type PreviewProps = {
  color?: CssColors;
} & PropsWithChildren;

function KnobPreview(props: PreviewProps) {
  const [value, setValue] = useState(50);
  const { color } = props;

  return (
    <Stack.Item key={color}>
      <Section>
        <Stack>
          <Stack.Item>
            <Button variant="transparent" startIcon="angles-left" onClick={() => setValue(0)} />
          </Stack.Item>
          <Stack.Item>
            <Knob
              size={2}
              color={color}
              minValue={0}
              maxValue={100}
              onChange={(value) => setValue(value)}
              value={value}
            />
          </Stack.Item>
          <Stack.Item>
            <Button variant="transparent" startIcon="angles-right" onClick={() => setValue(100)} />
          </Stack.Item>
        </Stack>
      </Section>
    </Stack.Item>
  );
}

export const Default = {
  render: () => {
    return (
      <Stack fill justify="center">
        <KnobPreview />
      </Stack>
    );
  },
};

export const Colors = {
  render: () => {
    return (
      <Stack fill g={1} justify="center" wrap>
        {CSS_COLORS.map((color) => (
          <KnobPreview color={color} key={color} />
        ))}
      </Stack>
    );
  },
};
