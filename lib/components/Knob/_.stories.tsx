import { COMPONENT_COLORS } from '@common/constants';
import { Button, Knob, Section, Stack } from '@components';
import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof Knob>;
export default {
  component: Knob,
  title: 'Components/Knob',
} satisfies Meta<StoryProps>;

type PreviewProps = {
  color?: string;
} & PropsWithChildren;

function KnobPreview(props: PreviewProps) {
  const [value, setValue] = useState(50);
  const { color } = props;

  return (
    <Stack.Item key={color}>
      <Section>
        <Stack>
          <Stack.Item>
            <Button
              variant="transparent"
              fontSize={2.5}
              startIcon="angles-left"
              onClick={() => setValue(0)}
            />
          </Stack.Item>
          <Stack.Item>
            <Knob
              color={color}
              maxValue={100}
              minValue={0}
              onChange={(value) => setValue(value)}
              size={2.5}
              value={value}
            />
          </Stack.Item>
          <Stack.Item>
            <Button
              variant="transparent"
              fontSize={2.5}
              startIcon="angles-right"
              onClick={() => setValue(100)}
            />
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
        {[...COMPONENT_COLORS.states, ...COMPONENT_COLORS.spectrum].map((color) => (
          <KnobPreview color={color} key={color} />
        ))}
      </Stack>
    );
  },
};
