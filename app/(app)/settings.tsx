import React from 'react';
import { Text, View } from 'react-native';

import SignoutButton from '@/src/components/navs/SignoutButton';
import { useSupabase } from '@/src/hooks/useSupabase';

const Settings: React.FC = () => {
  const { user } = useSupabase();
  console.log(user);

  return (
    <View className="flex flex-1 items-center justify-center bg-background">
      <Text className="text-xl text-black">Yo!</Text>
      <SignoutButton />
    </View>
  );
};

export default Settings;
