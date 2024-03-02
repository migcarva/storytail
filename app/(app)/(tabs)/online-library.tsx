import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';

const OnlineLibraryScreen: React.FC = () => {
  console.log(Platform.OS === 'ios' ? 'dark' : 'auto');
  return (
    <View className="flex flex-1 items-center justify-center bg-background">
      <Text className="text-xl text-black">Online Library</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
    </View>
  );
};

export default OnlineLibraryScreen;
