/** biome-ignore-all lint/suspicious/noArrayIndexKey: <Don't care, story> */
import { Window } from '@stories/window';
import { useState } from 'react';
import { Chart } from 'ss13-ui-kit/components/Chart/index';
import {
  Button,
  Collapsible,
  Dropdown,
  Icon,
  Input,
  Modal,
  Section,
  Stack,
} from 'ss13-ui-kit/components/index';

export function Preview() {
  return (
    <Window>
      <Window.Content>
        <Content />
      </Window.Content>
    </Window>
  );
}

const defaultItems: any[] = [];
for (let i = 0; i < 500; i++) {
  defaultItems.push({
    displayText: `Item ${i}`,
    value: `item-${i}`,
  });
}

function Content() {
  const [selected, setSelected] = useState(false);
  const [isScrollable, setScrollable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState<string>();
  const displayText = dropdownSelected
    ? defaultItems.find((item) => item.value === dropdownSelected)?.displayText
    : 'Dropdown';

  return (
    <Stack fill vertical>
      <Stack.Item grow>
        <Section
          fill
          scrollable
          title="Section title"
          buttons={
            <>
              <Modal
                title="Test Modal"
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
              >
                Poor Content
              </Modal>
              <Button
                startIcon={{ animation: { fade: true }, name: 'gamepad' }}
                tooltip={{ content: 'This is a tooltip' }}
                onClick={() => setModalOpen(true)}
              >
                Button
              </Button>
              <Input placeholder="Search..." />
            </>
          }
        >
          <Stack fill vertical>
            <Stack.Item grow>
              {selected &&
                Array.from({ length: 10 }, (_, i) => (
                  <div key={i}>Section content 1234567890</div>
                ))}
              <Icon.Stack>
                <Icon regular name="circle" size={2} />
                <Icon name="book" />
              </Icon.Stack>
            </Stack.Item>
            <Stack.Item>
              <Chart
                height="64px"
                data={[
                  [0, 50],
                  [10, 55],
                  [20, 48],
                  [30, 60],
                  [40, 52],
                  [50, 65],
                  [60, 58],
                  [70, 70],
                  [80, 62],
                  [90, 75],
                  [100, 68],
                ]}
              />
            </Stack.Item>
          </Stack>
        </Section>
      </Stack.Item>
      <Stack.Item>
        <Section
          scrollable={isScrollable}
          title="Section title"
          buttons={
            <>
              <Button
                selected={selected}
                onClick={() => setSelected(!selected)}
              >
                Primary
              </Button>
              <Button
                color="secondary"
                onClick={() => setScrollable(!isScrollable)}
              >
                Secondary
              </Button>
            </>
          }
        >
          Section content
          <Collapsible
            title="Collapsible"
            buttons={
              <>
                <Button>Do nothing</Button>
                <Button
                  startIcon={{ name: 'times' }}
                  tooltip={{ content: 'This button do nothing.' }}
                />
              </>
            }
          >
            <Dropdown
              buttons
              options={defaultItems}
              displayText={displayText}
              selected={dropdownSelected}
              onSelected={setDropdownSelected}
            />
            Interactive story playground Controls give you an easy to use
            interface to test your components. Set your story args and you'll
            see controls appearing here automatically.
          </Collapsible>
        </Section>
      </Stack.Item>
    </Stack>
  );
}
