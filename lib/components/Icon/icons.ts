import type {
  IconDefinition,
  IconName,
} from '@fortawesome/fontawesome-svg-core';

/**
 * Custom icons to use with Icon component.
 * iconName must start with "tg-" prefix to avoid conflicts with FontAwesome icons.
 * Icon should consist of 1 path, you can out 2 paths in array, icon will be rendered as duotone FA icon.
 *
 * See IconDefinition type for more details.
 */
const tgNanotrasen: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-nanotrasen' as IconName,
  icon: [
    425,
    200,
    [],
    '',
    'M178 .04h-71.2a6.76 6.03 0 0 0-6.76 6.02v187.88a6.76 6.03 0 0 0 6.76 6.02h53.1a6.76 6.03 0 0 0 6.77-6.02V92.39l72.21 104.7a6.76 6.03 0 0 0 5.77 2.87h73.55a6.76 6.03 0 0 0 6.76-6.02V6.06A6.76 6.03 0 0 0 318.2.04h-54.72a6.76 6.03 0 0 0-6.76 6.02v102.62L183.76 2.91A6.76 6.03 0 0 0 178 .04M4.84 22.1A13.41 12.5 0 0 1 13.48.05H79.6a5.36 5 0 0 1 5.36 5v79.88zm415.32 155.8a13.41 12.5 0 0 1-8.64 22.06H345.4a5.36 5 0 0 1-5.36-5v-79.88z',
  ],
};

const tgSyndicate: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-syndicate' as IconName,
  icon: [
    200,
    290,
    [],
    '',
    'M94 0Q66 0 45 9 25 19 13 36 3 53 3 76q0 16 8 30 9 13 25 25 18 11 46 23 30 13 45 22t21 20 6 26q0 24-15 37-16 12-45 12-21 0-34-4-13-6-22-16-8-11-13-29H0v57q51 11 90 11 24 0 44-4 20-5 34-14 15-9 23-25 9-15 8-36 0-20-9-35-10-14-28-26-17-10-49-24-26-11-39-20-15-9-25-19-8-9-9-25 0-14 6-23c11-15 41-2 45 24q8 10 12 28h21V35q-7-8-16-14l4 2q11 3 17 14 8 9 12 28h9q0 10-4 13-5 3-4 13c1 8 10 10 14 9l-5-2q0 1 6-1c-4 1-11-1-12-7q-1-6 3-10 5-4 5-15h9V9a280 280 0 0 0-68-9m70 17v41l3 3q8 10 12 28h21V33q-11-6-36-16m-28 6 8 18c-12-7-14-10-8-18m23 0c2 8 1 11-5 18zm15 24 8 18c-12-7-14-10-8-18m23 0c2 8 1 11-5 18zM97 49l9 18c-12-7-14-10-9-18m23 0c3 8 2 11-4 18z',
  ],
};

const tgAirTank: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-air-tank' as IconName,
  icon: [
    512,
    512,
    [],
    '',
    'm58 372 77 76a15 15 89 0 1 1 22l-13 13a66 66 0 0 1-96 0 75 75 0 0 1 0-101l10-10a15 15 179 0 1 21 0m353-193L188 415a15 15 179 0 1-21 0l-77-76a15 15 89 0 1-1-22L315 77c27-28 70-28 96 0s26 74 0 102m87-72-86-93q-19 0-36-5c-8 8-8 22 0 31l93 98c8 9 21 9 29 0 8-8 8-22 0-31M290 46c16 18 5 56-23 83-29 28-39 35-55 16s-3-31 26-58c28-28 36-60 52-41',
  ],
};

const tgAirTankSlash: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-air-tank-slash' as IconName,
  icon: [
    512,
    512,
    [],
    '',
    'M21 0Q13 0 6 6c-8 9-8 22 0 31l470 469a21 21 0 0 0 30-30L313 283l98-104c26-28 26-74 0-102a65 65 0 0 0-96 0l-35 38c18-25 23-54 10-69q-4-6-9-6c-11 0-21 25-43 47-29 27-42 39-26 58 14 17 24 13 47-8l-45 47L36 6q-6-6-15-6m355 9c-8 8-8 22 0 31l93 98c8 9 21 9 29 0 8-8 8-22 0-31l-86-93q-19 0-36-5M156 246l-67 71a15 15 0 0 0 1 22l77 76a15 15 0 0 0 21 0l67-70zM47 367a15 15 0 0 0-10 5l-10 10a75 75 0 0 0 0 101c26 28 70 28 96 0l13-13a15 15 0 0 0-1-22l-77-76a15 15 0 0 0-11-5'
  ],
};

const tgBadTouch: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-bad-touch' as IconName,
  icon: [
    512,
    512,
    [],
    '',
    'M212 93a36 36 0 1 0-73 0 36 36 0 0 0 73 0m69 110q-50-3-96-22-5-2-3-6 1-3 5-3h89a15 15 0 0 0 0-30H148q-21 1-29 22l-25 91-13 77-66 12a19 19 0 1 0 7 36l73-13q20-5 24-24l7-36q0-3 3-2l2 1 20 40-31 84a19 19 0 0 0 35 13l33-91q4-13-1-24l-33-65 17-56q52 22 109 25a15 15 0 0 0 1-29m106-41-119 97 27 32 80-65-6 40-109 168c12 6 26 20 37 20l87-135c3 18 22 38 14 55l-39 60c13 5 27 22 38 20l51-81-38-102c5-16 4-44 12-52 8 9 31 16 31 27l-25 40c12 6 26 20 36 21l48-75-90-64q-17-4-35-6m28-83c-39-2-39 63 0 61 41 0 41-62 0-61',
  ],
};

const tgImagePlus: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-image-plus' as IconName,
  icon: [
    670,
    512,
    [],
    '',
    'M656 228h-57v-57q-1-13-15-14h-28q-13 1-15 14v57h-57q-13 2-14 15v28q1 13 14 15h57v57q2 13 15 14h28q14-1 15-14v-57h57q13-1 14-15v-28q-1-13-14-15M384 122v6H256V0h6a24 24 0 0 1 17 7l98 98a24 24 0 0 1 7 17m-136 38c-13 0-24-11-24-24V0H24C11 0 0 11 0 24v464c0 13 11 24 24 24h336c13 0 24-11 24-24V160zm-135 16a48 48 0 1 1 0 96 48 48 0 0 1 0-96m208 240H65v-48l40-40q7-7 16 0l40 40 103-104q9-6 17 0l40 40z',
  ],
};

const tgImageMinus: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-image-minus' as IconName,
  icon: [
    670,
    512,
    [],
    '',
    'M656 228H484q-13 1-14 14v29q1 13 14 14h172q13-1 14-14v-29q-1-13-14-14M384 122v6H256V0h6a24 24 0 0 1 17 7l98 98a24 24 0 0 1 7 17m-136 38c-13 0-24-11-24-24V0H24C11 0 0 11 0 24v464c0 13 11 24 24 24h336c13 0 24-11 24-24V160zm-135 16a48 48 0 1 1 0 96 48 48 0 0 1 0-96m208 240H65v-48l40-40q7-7 16 0l40 40 103-104q9-6 17 0l40 40z',
  ],
};

const tgSoundPlus: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-sound-plus' as IconName,
  icon: [
    542,
    512,
    [],
    '',
    'M528 228h-57v-57q-1-13-15-14h-28q-13 1-15 14v57h-57q-13 1-14 14v29q1 13 14 14h57v57q1 14 15 15h28q13-1 15-15v-57h57q13-1 14-14v-29q-1-13-14-14M215 71l-89 89H24c-13 0-24 11-24 24v144c0 13 11 24 24 24h102l89 89c15 15 41 4 41-17V88c0-21-26-32-41-17',
  ],
};

const tgSoundMinus: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-sound-minus' as IconName,
  icon: [
    542,
    512,
    [],
    '',
    'm215 71-89 89H24c-13 0-24 11-24 24v144c0 13 11 24 24 24h102l89 89c15 15 41 4 41-17V88c0-21-26-32-41-17m313 157H356q-13 1-14 14v29q1 13 14 14h172q13-1 14-14v-29q-1-13-14-14',
  ],
};

const tgNonBinary: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-non-binary' as IconName,
  icon: [
    512,
    512,
    [],
    '',
    'm321 354-48-192q-6-17-24-18h-11q-17 8-37 8v360h16c14 0 24-11 24-24V384h56c16 0 27-15 24-30M265 64c0-35-28-64-64-64v128c36 0 64-29 64-64m-112 80c-26 0-48 22-48 48v136c0 13 11 24 24 24h16v136c0 13 11 24 24 24h32V152q-18 0-36-8zm-16-80c0 35 29 64 64 64V0c-35 0-64 29-64 64',
  ],
};

const tgProstheticLeg: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-prosthetic-leg' as IconName,
  icon: [
    512,
    512,
    [],
    '',
    'M150 0a61 61 0 0 0-61 61 61 61 0 0 0 61 62 61 61 0 0 0 61-62 61 61 0 0 0-61-61m149 99c-14-1-39 20-45 35q-28 8-55 7a277 277 0 0 1-71-9l-4-1-1-1h-1l-5-2c-24-6-57 7-71 47-19 55-23 91-16 151 8 39 32 47 55 48h136l43 116a34 34 0 0 0 64-24l-52-138q-8-21-32-22h-42l26-16c15-10-21-67-37-58l-63 40 10-60q-35-8-42-12a27 27 0 1 1 21-50h1l3 1 15 5a219 219 0 0 0 152-17l12-3q17 1 25 15c6 14 1 30-13 37l-15 7 43 48a34 34 0 1 0 51-45l-86-97q-3-3-6-2m2 42q-5 0-10 3a231 231 0 0 1-176 11 22 22 0 1 0-17 40 276 276 0 0 0 212-12 22 22 0 0 0-9-42',
  ],
};

const tgProstheticFull: IconDefinition = {
  prefix: 'fas',
  iconName: 'tg-prosthetic-full' as IconName,
  icon: [
    512,
    512,
    [],
    '',
    'M213 7a81 83 0 0 0-81 83 81 83 0 0 0 81 83 81 83 0 0 0 82-83 81 83 0 0 0-82-83ZM41 205c-8 0-16 7-16 16v30c0 10 8 17 16 17h80v220q2 15 17 16h43q15-1 16-16v-45h32v45q1 15 16 16h44q15-1 16-16V268h80q15-1 17-17v-30q-2-15-17-16z',
  ],
};

export const tgIcons = {
  tgNanotrasen,
  tgSyndicate,
  tgAirTank,
  tgAirTankSlash,
  tgBadTouch,
  tgImagePlus,
  tgImageMinus,
  tgSoundPlus,
  tgSoundMinus,
  tgNonBinary,
  tgProstheticLeg,
  tgProstheticFull,
}

export type CustomIconName = 'tg-nanotrasen' | 'tg-syndicate' | 'tg-air-tank' | 'tg-air-tank-slash' | 'tg-bad-touch' | 'tg-image-plus' | 'tg-image-minus' | 'tg-sound-plus' | 'tg-sound-minus' | 'tg-non-binary' | 'tg-prosthetic-leg' | 'tg-prosthetic-full';
