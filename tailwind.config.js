/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig }
 */
import colors from 'tailwindcss/colors';

export const future = {
  hoverOnlyWhenSupported: true,
};
export const content = ['./**/*.{php,html}', './src/**/*.{js,ts}'];
export const theme = {
  borderWidth: {
    0: '0',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    6: '6px',
    8: '8px',
  },
  colors: {
    ...colors,
    bg: 'rgb(var(--color-bg) / <alpha-value>)',
    bg2: 'rgb(var(--color-bg2) / <alpha-value>)',
    bg3: 'rgb(var(--color-bg3) / <alpha-value>)',
    text: 'rgb(var(--color-text) / <alpha-value>)',
    hilight: 'rgb(var(--color-hilight) / <alpha-value>)',
  },
  extend: {},
};
export const plugins = [];
