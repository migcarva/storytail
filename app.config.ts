import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  slug: Env.NAME,
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#F9F8F8',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#F9F8F8',
    },
    package: Env.PACKAGE,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-router'],

  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
