import type { Preview } from '@storybook/react';
import { themes } from '../stories/themes';
import previewTheme from './previewTheme.ts';

import '../static/fonts.scss';
import '../static/fontawesome.min.css';
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
      document.documentElement.className = `theme-${context.globals.theme}`;
      return <Story />;
    },
  ],

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        icon: 'paintbrush',
        items: themes,
        title: 'Theme',
      },
    },
  },

  initialGlobals: {
    theme: 'default',
  },

  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      options: {
        section: { name: 'Section', value: 'rgba(0, 0, 0, 0.33)' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
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
