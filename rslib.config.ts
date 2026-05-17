import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      bundle: false,
      dts: {
        build: true,
      },
    },
  ],
  output: {
    legalComments: 'none',
    minify: true,
  },
  plugins: [pluginReact()],
  source: {
    entry: {
      index: [
        './lib/**/*.{ts,tsx}',
        '!./lib/**/*.test.ts',
        '!./lib/**/*stories.tsx',
      ],
    },
    tsconfigPath: './tsconfig.build.json',
  },
});
