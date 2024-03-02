import { useEffect } from 'react';

import { updateProfile, useGetProfile, useProfileStore } from '@/src/services/profile';

export const useProfile = (userId: string) => {
  const { username, setUsername, full_name, setFullName, updated_at, setUpdatedAt, id, setId } =
    useProfileStore();

  const { data: profile } = useGetProfile({ userId });

  const handleProfileUpdate = async ({
    username,
    full_name,
  }: {
    username: string;
    full_name: string;
  }) => {
    const options = {
      username,
      full_name,
    };
    await updateProfile({ userId, options });
    setUsername(username);
    setFullName(full_name);
  };

  useEffect(() => {
    if (profile?.username) setUsername(profile.username);
    if (profile?.full_name) setFullName(profile.full_name);
    if (profile?.updated_at) setUpdatedAt(profile.updated_at);
    if (profile?.id) setId(profile.id);
  }, [profile]);

  return { username, full_name, id, updated_at, handleProfileUpdate };
};
