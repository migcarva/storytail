import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';

const BookReader: React.FC = () => {
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
      <Stack.Screen name="reader" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen
        name="edit-details"
        options={{ ...modalOptions, headerTitle: 'Details' }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
};

export default BookReader;
