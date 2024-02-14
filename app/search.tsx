import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Text, View } from 'tamagui';

export default function SearchScreen() {
  return (
    <View f={1} alignItems="center" justifyContent="center" backgroundColor="$accent">
      <Text fontSize="$2" color="$white" fontFamily="$body">
        Search
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
