import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

import NotificationsTabs from '@/src/components/NotificationsTabs';

const Notifications: React.FC = () => {
  return (
    <View className="flex flex-1 items-center bg-background pt-6 px-2">
      <NotificationsTabs />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Notifications;
