import { Window } from '@stories/window';
import { Button, Section, Stack } from 'ss13-ui-kit/components/index';

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
  return (
    <Stack fill vertical>
      <Stack.Item>
        <Section
          title="Section title"
          buttons={<Button startIcon={{ name: 'book' }}>Button</Button>}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Section content 1234567890</div>
          ))}
          <Section title="Nested section">
            Nested section content
            <Section title="Nested section 2">Nested section content</Section>
          </Section>
        </Section>
      </Stack.Item>
      <Stack.Item>
        <Section title="Section title" buttons={<Button>Button</Button>}>
          Section content
        </Section>
      </Stack.Item>
    </Stack>
  );
}
