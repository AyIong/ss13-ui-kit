import { Window } from '@stories/window';
import { useState } from 'react';
import {
  Button,
  Collapsible,
  Icon,
  Input,
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

function Content() {
  const [selected, setSelected] = useState(false);

  return (
    <Stack fill vertical>
      <Stack.Item grow>
        <Section
          fill
          scrollable
          title="Section title"
          buttons={
            <>
              <Button
                startIcon={{ animation: { fade: true }, name: 'gamepad' }}
                tooltip={{ content: 'This is a tooltip' }}
              >
                Button
              </Button>
              <Input placeholder="Search..." />
            </>
          }
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Section content 1234567890</div>
          ))}
          <Icon.Stack>
            <Icon regular name="circle" size={2} />
            <Icon name="book" />
          </Icon.Stack>
        </Section>
      </Stack.Item>
      <Stack.Item>
        <Section
          title="Section title"
          buttons={
            <>
              <Button
                selected={selected}
                onClick={() => setSelected(!selected)}
              >
                Primary
              </Button>
              <Button color="secondary">Secondary</Button>
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
            Interactive story playground Controls give you an easy to use
            interface to test your components. Set your story args and you'll
            see controls appearing here automatically.
          </Collapsible>
        </Section>
      </Stack.Item>
    </Stack>
  );
}
