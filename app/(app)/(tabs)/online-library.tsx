import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { isIphone } from '@/src/utils';

const OnlineLibraryScreen: React.FC = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-background">
      <Text className="text-xl text-black">Online Library</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={isIphone ? 'dark' : 'auto'} />
    </View>
  );
};

export default OnlineLibraryScreen;
