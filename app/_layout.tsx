import Ionicons from '@expo/vector-icons/Ionicons';
import {
  useFonts,
  Bellota_300Light,
  Bellota_400Regular,
  Bellota_700Bold,
} from '@expo-google-fonts/bellota';
import {
  BellotaText_300Light,
  BellotaText_400Regular,
  BellotaText_700Bold,
} from '@expo-google-fonts/bellota-text';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import '@tamagui/core/reset.css';
import Constants from 'expo-constants';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

import { useColorScheme } from '@/hooks/useColorScheme';
import { config } from '@/tamagui.config';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = Constants.expoConfig!.extra!.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    BellotaText_300Light,
    BellotaText_400Regular,
    BellotaText_700Bold,
    Bellota_300Light,
    Bellota_400Regular,
    Bellota_700Bold,
    ...Ionicons.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <InitialLayout />
      </ClerkProvider>
    </TamaguiProvider>
  );
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;

    console.log('user changed: ', isSignedIn);

    const inAuthGroup = segments[0] === '(auth)';
    if (isSignedIn && !inAuthGroup) {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/signin');
    }
  }, [isSignedIn]);

  return <Slot />;
};

export default RootLayout;
