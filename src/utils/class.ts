import { type ClassValue, clsx } from 'clsx';
import { PressableStateCallbackType } from 'react-native';
import { extendTailwindMerge, twMerge } from 'tailwind-merge';

import colors, { purple, yellow } from './colors';

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: [
        'transparent',
        'currentColor',
        ...Object.keys(colors).map((key) => key),
        {
          white: Object.keys(white).map((key) => key),
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function isTextChildren(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode),
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}
