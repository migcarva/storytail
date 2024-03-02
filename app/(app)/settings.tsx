import React from 'react';
import { Text, View } from 'react-native';

import UpdateProfileForm from '@/src/components/auth/UpdateProfileForm';
import SignoutButton from '@/src/components/navs/SignoutButton';
import { useProfileStore } from '@/src/services/profile';

const Settings: React.FC = () => {
  const { username, full_name } = useProfileStore();
  const displaName = full_name || username || 'adventurer!';

  return (
    <View className="flex flex-1 px-2 pt-6 bg-background">
      <Text className="text-2 text-black font-heading">Hello, {displaName}</Text>
      <Text className="text-black font-body">
        <Text className="text-1.5">username: </Text>
        <Text className="text-1.5 font-bodybold">{username}</Text>
      </Text>

      <UpdateProfileForm />
      <SignoutButton />
    </View>
  );
};

export default Settings;
