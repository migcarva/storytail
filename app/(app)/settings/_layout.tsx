import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';

import CloseButton from '@/src/components/navs/CloseButton';
import GoBackButton from '@/src/components/navs/GoBackButton';
import colors from '@/src/utils/colors';

const SettingsPage: React.FC = () => {
  const isSignedIn = true;

  const baseOptions: NativeStackNavigationOptions = {
    headerTransparent: true,
    headerTitleStyle: {
      fontFamily: 'BellotaText_700Bold',
      fontSize: 20,
    },
    headerLargeTitleStyle: {
      color: colors.black,
    },
    headerBackTitle: 'back',
    headerBackButtonMenuEnabled: false,
  };

  const modalOptions: NativeStackNavigationOptions = {
    ...baseOptions,
    headerLeft: () => <GoBackButton path="/settings" />,
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...baseOptions,
          headerTitle: 'Settings',
          headerRight: () => <CloseButton />,
        }}
      />
      <Stack.Screen name="profile" options={{ ...modalOptions, headerTitle: 'Profile ' }} />
      <Stack.Screen
        name="subscription"
        options={{ ...modalOptions, headerTitle: 'Subscription' }}
      />
      <Stack.Screen
        name="support"
        options={{ ...modalOptions, headerTitle: 'Support & Feedback' }}
      />
      <Stack.Screen name="gifting" options={{ ...modalOptions, headerTitle: 'Gift Storytail' }} />
      <Stack.Screen
        name="how-to-use"
        options={{ ...modalOptions, headerTitle: 'How to Storytail?' }}
      />
    </Stack>
  );
};

export default SettingsPage;
