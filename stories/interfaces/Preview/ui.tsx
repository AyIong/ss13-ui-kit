import { Window } from '@stories/window';
import { Button, Section, Stack } from 'ss13-ui-kit/components/index';

export function Preview() {
  return (
    <Window>
      <Window.Content>
        <Stack fill vertical>
          <Stack.Item grow>
            <Section
              fill
              scrollable
              title="Section title"
              buttons={<Button>Button</Button>}
            >
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
              Section content <br />
            </Section>
          </Stack.Item>
          <Stack.Item>
            <Section
              fill
              title="Section title"
              buttons={<Button>Button</Button>}
            >
              Section content
            </Section>
          </Stack.Item>
        </Stack>
      </Window.Content>
    </Window>
  );
}
