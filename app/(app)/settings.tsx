import React from 'react';
import { Text, View } from 'react-native';

import UpdateProfileForm from '@/src/components/auth/UpdateProfileForm';
import SignoutButton from '@/src/components/navs/SignoutButton';
import useUserStore from '@/src/lib/stores/user';

const Settings: React.FC = () => {
  const { username, fullName } = useUserStore();

  const displaName = fullName || username || 'adventurer!';

  return (
    <View className="flex flex-1 px-2 pt-6 bg-background">
      <Text className="text-xl text-black">Hello, {displaName}</Text>

      <UpdateProfileForm />
      <SignoutButton />
    </View>
  );
};

export default Settings;
