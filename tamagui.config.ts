import { config as configBase } from '@tamagui/config'
import { createFont, createTamagui, createTokens } from 'tamagui'

const sizes = {
  '0.5': 8,
  '0.625': 10,
  '0.75': 12,
  '0.875': 14,
  1: 16,
  true: 16,
  2: 20,
  3: 24,
  4: 32,
  5: 40,
  6: 48,
}


const weights = {
  1: 300,
  2: 400,
  3: 700,
  true: 400,
}

const letterSpacings = {
  '-5': -5,
  '-1': -1,
  1: 0,
  5: 5,
  10: 10,
}

const BellotaFont = createFont({
  family: 'Bellota_400Regular',
  size: sizes,
  lineHeight: sizes,
  weight: weights,
  letterSpacing: letterSpacings,
  // (native only) swaps out fonts by face/style
  face: {
    300: { normal: 'Bellota_300Light' },
    400: { normal: 'Bellota_400Regular' },
    700: { normal: 'Bellota_700Bold' },
  },
});

const BellotaTextFont = createFont({
  family: 'BellotaText_400Regular',
  size: sizes,
  lineHeight: sizes,
  weight: weights,
  letterSpacing: letterSpacings,
  // (native only) swaps out fonts by face/style
  face: {
    300: { normal: 'BellotaText_300Light' },
    400: { normal: 'BellotaText_400Regular' },
    700: { normal: 'BellotaText_700Bold' },
  },
});

export const tokens = createTokens({
  size: sizes,
  space: { ...sizes, '-1': -4, '-2': -8 },
  radius: { 0: 0, 1: 4, 2: 6, 3: 8, 4: 16 },
  zIndex: { 0: 0, 1: 100, 2: 200 },
  color: {
    white: '#fff',
    primary: '#12EDD4',
    secondary: '#FFDC56',
    accent: '#513175',
    complementary: '#FF717F',
    extraordinary: '#FD8545',
    background: '#F9F8F8',
    grey: '#4E4E4E',
    lightgrey: '#C1BCBC',
    input: 'D9D9D9',
    black: '#221413',
  },
});

export const config = createTamagui({
  ...configBase,
  fonts: {
    heading: BellotaFont,
    body: BellotaTextFont,
  },
  tokens,
  shorthands: {
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    f: 'flex',
    m: 'margin',
    w: 'width',
    h: 'height',
  } as const,
});

export default config

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
