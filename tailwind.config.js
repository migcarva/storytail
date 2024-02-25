/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const colors = require('./src/utils/colors');

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    // CHECK: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
    fontFamily: {
      headinglight: ['Bellota_300Light'],
      heading: ['Bellota_400Regular'],
      headingbold: ['Bellota_700Bold'],
      bodylight: ['BellotaText_300Light'],
      body: ['BellotaText_400Regular'],
      bodybold: ['BellotaText_700Bold'],
    },
    extend: {
      colors,
      spacing: {
        0.125: '0.125rem',
        0.25: '0.25rem',
        0.5: '0.5rem',
        0.625: '0.625rem',
        0.75: '0.75rem',
        0.875: '0.875rem',
        1: '1rem',
        1.25: '1.25rem',
        1.5: '1.5rem',
        2: '2rem',
        2.5: '2.5rem',
        3: '3rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
        7: '7rem',
        8: '8rem',
        9: '9rem',
        10: '10rem',
      },
      fontSize: ({ theme }) => ({
        ...theme('spacing'),
      }),
      borderRadius: ({ theme }) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
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
        // '.book-shadow': {
        //   boxShadow: 'drop-shadow(16px 64px 16px rgba(0, 0, 0, 0.25))',
        // },
      });
    }),
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.book-shadow': {
          filter: 'drop-shadow(16px 64px 16px rgba(0, 0, 0, 0.25))',
        },
      });
    }),
  ],
};
