import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
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
    target: 'web',
    legalComments: 'none',
    minify: true,
  },
  plugins: [pluginReact({ reactCompiler: false }), pluginSass()],
  source: {
    entry: {
      index: [
        './lib/**/*.{ts,tsx}',
        './lib/components/main.scss',
        '!./lib/**/*.test.{ts,tsx}',
        '!./lib/**/*.stories.{ts,tsx}',
      ],
    },
    tsconfigPath: './tsconfig.build.json',
  },
});
