import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    // CHECK: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'hsl(var(--color-white) / <alpha-value>)',
      lightgrey: 'hsl(var(--color-lightgrey) / <alpha-value>)',
      grey: 'hsl(var(--color-grey) / <alpha-value>)',
      black: 'hsl(var(--color-black) / <alpha-value>)',
      purple: 'hsl(var(--color-purple) / <alpha-value>)',
      blue: 'hsl(var(--color-blue) / <alpha-value>)',
      yellow: 'hsl(var(--color-yellow) / <alpha-value>)',
      pink: 'hsl(var(--color-pink) / <alpha-value>)',
      orange: 'hsl(var(--color-orange) / <alpha-value>)',
      background: 'hsl(var(--color-background) / <alpha-value>)',
      input: 'hsl(var(--color-input) / <alpha-value>)',
    },
    fontFamily: {
      heading: ['Bellota_400Regular'],
      body: ['BellotaText_400Regular'],
    },
    extend: {
      spacing: {
        '0.25': '0.25rem',
        '0.5': '0.5rem',
        '0.625': '0.625rem',
        '0.75': '0.75rem',
        '0.875': '0.875rem',
        '1': '1rem',
        '1.25': '1.25rem',
        '1.5': '1.5rem',
        '2': '2rem',
        '2.5': '2.5rem',
        '3': '3rem',
        '4': '4rem',
        '5': '5rem',
        '6': '6rem',
        '7': '7rem',
        '8': '8rem',
        '9': '9rem',
        '10': '10rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        '.content-hidden': {
          'content-visibility': 'hidden',
        },
        '.content-visible': {
          'content-visibility': 'visible',
        },
      });
    }),
    plugin(function ({ addComponents }: { addComponents: any }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
      });
    }),
  ],
} satisfies Config;
