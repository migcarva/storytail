import { Stack } from 'expo-router';

const BookReader: React.FC = () => {
  const isSignedIn = true;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen name="reader" options={{ headerShown: false }} redirect={!isSignedIn} />
    </Stack>
  );
};

export default BookReader;
