import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import NotificationsTabs from '@/src/components/NotificationsTabs';
import { isIphone } from '@/src/utils';

const Notifications: React.FC = () => {
  return (
    <View className="flex flex-1 items-center bg-background pt-6 px-2">
      <NotificationsTabs />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={isIphone ? 'light' : 'auto'} />
    </View>
  );
};

export default Notifications;
