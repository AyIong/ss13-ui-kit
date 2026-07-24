import type { Preview } from '@storybook/react';
import { themes } from '../stories/themes';
import previewTheme from './previewTheme.ts';

import '../static/fonts.scss';
import '../styles/main.scss';
import '../styles/storybook.scss';

import {
  Controls,
  Description,
  Primary,
  Subtitle,
} from '@storybook/addon-docs/blocks';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      document.documentElement.className = `
        theme-${context.globals.theme} pref-${context.globals.colorScheme}
      `;
      return <Story />;
    },
  ],

  globalTypes: {
    theme: {
      description: 'Components thematic style',
      toolbar: {
        icon: 'paintbrush',
        items: themes,
        title: 'Theme',
      },
    },
    colorScheme: {
      description: 'Global theme for components',
      toolbar: {
        icon: 'sun',
        items: ['day', 'night'],
        title: 'Color Scheme',
      },
    },
  },

  initialGlobals: {
    theme: 'default',
    colorScheme: 'night',
  },

  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      codePanel: true,
      page: () => (
        <>
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
      theme: previewTheme,
      toc: false,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default preview;
