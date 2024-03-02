import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Link, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import colors from '@/src/utils/colors';

const SettingsPage: React.FC = () => {
  const isSignedIn = true;

  const modalOptions: NativeStackNavigationOptions = {
    // presentation: 'modal',
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
    headerLeft: () => <BackButton />,
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...modalOptions,
          headerTitle: 'Settings',
        }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="profile"
        options={{ ...modalOptions, headerTitle: 'Profile ' }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="subscription"
        options={{ ...modalOptions, headerTitle: 'Subscription' }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="support"
        options={{ ...modalOptions, headerTitle: 'Support & Feedback' }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="gifting"
        options={{ ...modalOptions, headerTitle: 'Gift Storytail' }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="how-to-use"
        options={{ ...modalOptions, headerTitle: 'How to Storytail?' }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
};

export default SettingsPage;

const BackButton = () => (
  <Link href="/settings" asChild>
    <Pressable>
      {({ pressed }) => (
        <View className="flex flex-row gap-0.5 items-center">
          <Ionicons
            name="chevron-back-outline" // Cast to `any` to bypass the type checking issue
            size={16}
            color={colors.black}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
          <Text className="font-body text-1.25 text-black" style={{ opacity: pressed ? 0.5 : 1 }}>
            back
          </Text>
        </View>
      )}
    </Pressable>
  </Link>
);
