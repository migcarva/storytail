import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useProfileStore } from '@/src/services/profile';
import { UpdateProfileProps } from '@/src/types';

export const useProfile = (userId: string) => {
  const { username, full_name, updateProfile, getProfile } = useProfileStore();

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile(userId);
    };

    fetchProfile();
  }, []);

  const mutation = useMutation({
    mutationFn: (params: UpdateProfileProps) => {
      return updateProfile(params.userId, params.options);
    },
    meta: {
      errorMessage: `Failed to UPDATE profile of user with ID: ${userId}`,
    },
  });

  return {
    username,
    full_name,
    mutation,
  };
};
