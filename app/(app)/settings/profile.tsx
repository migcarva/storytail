import React from 'react';
import { Text, View } from 'react-native';

import UpdateProfileForm from '@/src/components/auth/UpdateProfileForm';
import SignoutButton from '@/src/components/navs/SignoutButton';
import { useAuthStore } from '@/src/services/auth';
import { useGetProfile } from '@/src/services/profile';

const ProfileManagement: React.FC = () => {
  const { user } = useAuthStore();
  const { data: profile, status, error } = useGetProfile({ userId: user!.id });

  if (status === 'pending') {
    return (
      <View className="flex flex-1 px-2 pt-6 bg-background">
        <Text className="text-2 text-black font-heading">Loading profile</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View className="flex flex-1 px-2 pt-6 bg-background">
        <Text className="text-2 text-black font-heading">Error loading profiel</Text>
        <Text className="text-1.25 text-black font-heading">{error.message}</Text>
      </View>
    );
  }

  const displaName = profile!.full_name || profile!.username || 'adventurer!';

  return (
    <View className="flex flex-1 px-2 pt-6 bg-background">
      <Text className="text-2 text-black font-heading">Hello, {displaName}</Text>

      <UpdateProfileForm />
      <SignoutButton />
    </View>
  );
};

export default ProfileManagement;
