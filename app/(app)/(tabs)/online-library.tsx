import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const OnlineLibraryScreen: React.FC = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-background">
      <Text className="text-xl text-black">Online Library</Text>

      <StatusBar style="dark" />
    </View>
  );
};

export default OnlineLibraryScreen;
