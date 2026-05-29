import { Window } from '@stories/window';
import {
  Button,
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
                startIcon={{ animation: 'fade', name: 'gamepad' }}
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
        <Section title="Section title" buttons={<Button>Button</Button>}>
          Section content
        </Section>
      </Stack.Item>
    </Stack>
  );
}
