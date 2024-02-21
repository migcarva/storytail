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

import { useColorScheme } from '@/src/hooks/useColorScheme';
import { SupabaseProvider, useSupabase } from '@/src/lib/supabase/SupabaseContext';
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

const RootLayout: React.FC = () => {
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
      <SupabaseProvider>
        <InitialLayout />
      </SupabaseProvider>
    </TamaguiProvider>
  );
};

const InitialLayout: React.FC = () => {
  const { loggedIn } = useSupabase();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!loggedIn) return;

    const inAuthGroup = segments[0] === '(auth)';
    if (loggedIn && !inAuthGroup) {
      router.replace('/user-library');
    } else if (!loggedIn) {
      router.replace('/signin');
    }
  }, [loggedIn]);

  return <Slot />;
};

export default RootLayout;
