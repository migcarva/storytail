import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';

const StoryReader: React.FC = () => {
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
      <Stack.Screen name="index" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen name="intro" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen name="the-end" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen name="[chapter]" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen
        name="edit-details"
        options={{ ...modalOptions, headerTitle: 'Details' }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
};

export default StoryReader;
