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
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import '@tamagui/core/reset.css';

import { useColorScheme } from '@/components/useColorScheme';
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

export default function RootLayout() {
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="Settings"
            options={{ presentation: 'modal', headerTransparent: true }}
          />
          <Stack.Screen
            name="Search"
            options={{ presentation: 'modal', headerTransparent: true }}
          />
          <Stack.Screen
            name="Notifications"
            options={{ presentation: 'modal', headerTransparent: true }}
          />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
