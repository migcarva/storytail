import React from 'react';
import { Text, View } from 'react-native';

import SignoutButton from '@/src/components/SignoutButton';

const Settings: React.FC = () => {
  // const { user } = useUser();

  return (
    <View className="flex flex-1 items-center justify-center bg-background">
      <Text className="text-xl text-white">
        {/* Welcome, {user?.firstName} {user?.lastName} 🎉 */}
        Yo!
      </Text>
      <SignoutButton />
    </View>
  );
};

export default Settings;
