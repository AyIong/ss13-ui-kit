/**
 * Full icon pipeline:
 *   1. svgo         - optimize source SVGs
 *   2. fantasticon  - build the icon font + FontAwesome.css
 *   3. lightningcss - minify the generated CSS
 *   4. generate     - IconName / AnimationName types from the CSS
 *
 * Run: bun tools/build_icons.js
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { $ } from 'bun';
import { FontAssetType, generateFonts, OtherAssetType } from 'fantasticon';

const SVG_DIR = 'static/font-assets';
const FA_CSS = 'styles/fonts/fontawesome/FontAwesome.css';
const FA_INPUT = resolve(FA_CSS);
const FA_ANIM_INPUT = resolve('lib/components/Icon/animations.scss');
const FA_OUTPUT = resolve('lib/components/Icon/icons.ts');
const BROWSERS = '>= 0.25%';

const CYAN = '\x1b[96m';
const GRAY = '\x1b[90m';
const RESET = '\x1b[0m';

const step = (n, title) => console.log(`${GRAY}[${n}/4]${RESET} ${title}`);

step(1, 'Optimizing SVG (svgo)');
await $`bun run svgo -r ${SVG_DIR}`.quiet();

step(2, 'Generating font (fantasticon)');
await generateFonts({
  name: 'FontAwesome',
  prefix: 'fa',
  fontsUrl: '.',
  assetTypes: [OtherAssetType.CSS],
  fontTypes: [FontAssetType.WOFF2],
  normalize: true,
  formatOptions: {
    svg: {
      centerHorizontally: true,
      centerVertically: true,
    },
  },
  inputDir: './static/font-assets',
  outputDir: './styles/fonts/fontawesome',
  templates: {
    css: './static/font-assets/template.css.hbs',
  },
  getIconId: ({ basename, relativeDirPath }) => {
    const names = {
      solid: basename,
      regular: `${basename}-o`,
      custom: `tg-${basename}`,
    };
    return `fa-${names[relativeDirPath]}`;
  },
});

step(3, 'Minifying CSS (lightningcss)');
await $`bun run lightningcss --minify --targets ${BROWSERS} ${FA_CSS} -o ${FA_CSS}`;

step(4, 'Generating icon types');
const isCustom = (name) => name.startsWith('tg-');
const isRegular = (name) => name.endsWith('-o') && !isCustom(name);
const isSolid = (name) => !isCustom(name) && !isRegular(name);
const isAnimation = (name) => name.startsWith('anim-');

function collect(css, filter) {
  const classRegex = /\.fa-([a-z0-9-]+)/g;
  const names = new Set();

  for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (filter !== isAnimation && !/--fa\s*:/.test(body)) {
      continue;
    }

    for (const [, name] of selector.matchAll(classRegex)) {
      if (filter(name)) {
        names.add(name);
      }
    }
  }

  return [...names].sort();
}

const faCss = readFileSync(FA_INPUT, 'utf8');
const animCss = readFileSync(FA_ANIM_INPUT, 'utf8');

const solidIcons = collect(faCss, isSolid); // .fa-user
const regularIcons = collect(faCss, isRegular); // .fa-user-o
const customIcons = collect(faCss, isCustom); // .fa-tg-logo
const animations = collect(animCss, isAnimation).map((n) => n.slice('anim-'.length)); // .fa-anim-beat -> beat

const list = (array) => array.map((name) => `  '${name}',`).join('\n');

const faContent = `// Auto-generated file. Do not change manually!
export type AnimationName =  (typeof ANIMATION_NAMES)[number];
export const ANIMATION_NAMES = [
${list(animations)}
] as const;

export type SolidIconName = (typeof SOLID_ICON_NAMES)[number];
export const SOLID_ICON_NAMES = [
${list(solidIcons)}
] as const;

export type RegularIconName = (typeof REGULAR_ICON_NAMES)[number];
export const REGULAR_ICON_NAMES = [
${list(regularIcons)}
] as const;

export type CustomIconName = (typeof CUSTOM_ICON_NAMES)[number];
export const CUSTOM_ICON_NAMES = [
${list(customIcons)}
] as const;
`;

writeFileSync(FA_OUTPUT, faContent);

console.log(`Generated ${CYAN}${solidIcons.length}${RESET} solid icons.
Generated ${CYAN}${regularIcons.length}${RESET} regular icons.
Generated ${CYAN}${customIcons.length}${RESET} custom icons.
Generated ${CYAN}${animations.length}${RESET} animation types.`);
