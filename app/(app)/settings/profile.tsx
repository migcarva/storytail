import React from 'react';
import { View } from 'react-native';

import UpdateProfileForm from '@/src/components/auth/UpdateProfileForm';

const ProfileManagement: React.FC = () => {
  return (
    <View className="flex flex-1 px-2 pt-6 bg-background">
      <UpdateProfileForm />
    </View>
  );
};

export default ProfileManagement;
