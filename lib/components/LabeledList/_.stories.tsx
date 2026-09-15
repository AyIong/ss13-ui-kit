import { Button, Divider, LabeledList, Section } from '@components';
import { type ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';

type StoryProps = ComponentProps<typeof LabeledList>;

export default {
  component: LabeledList,
  title: 'Components/LabeledList',
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    const [hide, setHide] = useState(false);

    return (
      <LabeledList>
        <LabeledList.Item
          label="Label 1"
          buttons={<Button startIcon="times" onClick={() => setHide(!hide)} />}
        >
          Value 1
        </LabeledList.Item>
        <Divider size={2} />
        <Section>
          Oh wow! You can put everything, inside LabeledList, and it will not broke layout
        </Section>
        <LabeledList.Item label="Label 2 but longer" tooltip={{ content: 'What did you expect?' }}>
          Value 2
        </LabeledList.Item>
        {!hide && <LabeledList.Item label="Label 3">Value 3</LabeledList.Item>}
      </LabeledList>
    );
  },
};
