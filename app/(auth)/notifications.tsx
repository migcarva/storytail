import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';

const Notifications: React.FC = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-background">
      <Text className="text-xl text-white">Notifications</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Notifications;
