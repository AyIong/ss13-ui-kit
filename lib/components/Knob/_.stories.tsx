import { CSS_COLORS, type CssColors } from '@common/constants';
import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button } from '../Button';
import { LabeledControls } from '../LabeledControls';
import { Section } from '../Section';
import { Stack } from '../Stack';
import { Knob } from '.';

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
        <LabeledControls>
          <LabeledControls.Item label="Min">
            <Button
              fontSize={2.5}
              variant="transparent"
              startIcon="angles-left"
              onClick={() => setValue(0)}
            />
          </LabeledControls.Item>
          <LabeledControls.Item label={color || ''}>
            <Knob
              size={2.5}
              color={color}
              minValue={0}
              maxValue={100}
              onChange={(value) => setValue(value)}
              value={value}
            />
          </LabeledControls.Item>
          <LabeledControls.Item label="Max">
            <Button
              fontSize={2.5}
              variant="transparent"
              startIcon="angles-right"
              onClick={() => setValue(100)}
            />
          </LabeledControls.Item>
        </LabeledControls>
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
