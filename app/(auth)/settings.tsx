import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Text, View } from 'tamagui';

import SignoutButton from '@/components/SignoutButton';

const Settings: React.FC = () => {
  const { user } = useUser();

  return (
    <View f={1} alignItems="center" justifyContent="center" backgroundColor="$background">
      <Text fontSize="$2" color="$black">
        Welcome, {user?.firstName} {user?.lastName} 🎉
      </Text>
      <SignoutButton />
    </View>
  );
};

export default Settings;
