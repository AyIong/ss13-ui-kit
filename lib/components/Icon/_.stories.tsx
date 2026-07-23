/** biome-ignore-all lint/suspicious/noArrayIndexKey: <Don't care for story> */
/**
 * Used AI during creation of this story
 * Cause FA has unclear documentation about internal const and types
 * And I don't want to waste much time for icons preview/stress-test
 */
import { far, type IconLookup } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { type ComponentProps, useMemo, useState } from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Button } from '../Button';
import { Section } from '../Section';
import { Stack } from '../Stack';
import { Tooltip } from '../Tooltip';
import { Icon } from '.';
import { tgIcons } from './icons';

type StoryProps = ComponentProps<typeof Icon>;
export default {
  component: Icon,
  title: 'Components/Icon',
} satisfies Meta<StoryProps>;

function uniqueIcons(source: Record<string, IconLookup>) {
  const seen = new Set<string>();
  return Object.values(source).filter(
    (icon) => !seen.has(icon.iconName) && seen.add(icon.iconName),
  );
}

function useRandomIcons(source: Record<string, IconLookup>, count = 5) {
  const [refresh, setRefresh] = useState(0);
  const icons = useMemo(
    () =>
      uniqueIcons(source)
        .sort(() => Math.random() - 0.5)
        .slice(0, count),
    [source, refresh, count],
  );
  return { icons, refresh: () => setRefresh((refresh) => refresh + 1) };
}
function RandomIcons({
  regular,
  icons,
}: {
  regular?: boolean;
  icons: IconLookup[];
}) {
  return (
    <Stack p={0.5}>
      {icons.map((icon) => (
        <Tooltip key={icon.iconName} content={icon.iconName}>
          <Icon regular={regular} name={icon.iconName} size={1.5} />
        </Tooltip>
      ))}
    </Stack>
  );
}

type Story = StoryObj<StoryProps>;
export const Default: Story = {
  render: () => {
    const solid = useRandomIcons(fas);
    const regular = useRandomIcons(far);
    const custom = useRandomIcons(tgIcons);

    const sections = [
      { title: 'Solid', ...solid, regular: false },
      { title: 'Regular', ...regular, regular: true },
      { title: 'Custom', ...custom, regular: false },
    ];

    return (
      <Stack>
        {sections.map(({ title, icons, refresh, regular }) => (
          <Section
            key={title}
            title={title}
            buttons={
              <Button
                tooltip={{ content: 'Refresh', position: 'top' }}
                startIcon={{ name: 'arrows-rotate' }}
                onClick={refresh}
              />
            }
          >
            <RandomIcons regular={regular} icons={icons} />
          </Section>
        ))}
      </Stack>
    );
  },
};

function AllIcons({
  source,
  regular,
}: {
  source: Record<string, IconLookup>;
  regular?: boolean;
}) {
  return (
    <Stack wrap>
      {uniqueIcons(source).map((icon) => (
        <Icon key={icon.iconName} regular={regular} name={icon.iconName} />
      ))}
    </Stack>
  );
}

export const AllSolidIcons: Story = {
  render: () => <AllIcons source={fas} />,
};

export const AllRegularIcons: Story = {
  render: () => <AllIcons source={far} regular />,
};

export const TGIcons: Story = {
  render: () => <AllIcons source={tgIcons} />,
};
