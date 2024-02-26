import { Stack } from 'expo-router';

const StoryCreator: React.FC = () => {
  const isSignedIn = true;

  return (
    <Stack>
      <Stack.Screen name="[step]" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen name="main-character" options={{ headerShown: false }} redirect={!isSignedIn} />
      <Stack.Screen
        name="generating-story"
        options={{ headerShown: false }}
        redirect={!isSignedIn}
      />
      <Stack.Screen name="result" options={{ headerTitle: 'Details' }} redirect={!isSignedIn} />
    </Stack>
  );
};

export default StoryCreator;
