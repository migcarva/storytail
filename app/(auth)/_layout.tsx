import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';

const TabsPage: React.FC = () => {
  const isSignedIn = true;

  const modalOptions: NativeStackNavigationOptions = {
    presentation: 'modal',
    headerTransparent: true,
    headerTitleStyle: {
      fontFamily: 'BellotaText_700Bold',
      fontSize: 20,
    },
  };

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen name="reader" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen name="creator" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen
        name="search-online-library"
        options={{ ...modalOptions, headerTitle: 'Search' }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="search-user-library"
        options={{ ...modalOptions, headerTitle: 'Search' }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="notifications"
        options={{ ...modalOptions, headerTitle: 'Notifications' }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="settings"
        options={{ ...modalOptions, headerTitle: 'Settings' }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
};

export default TabsPage;
