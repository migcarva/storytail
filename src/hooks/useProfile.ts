import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  updateProfile,
  getProfile,
  UpdateProfileProps,
  useProfileStore,
} from '@/src/services/profile';

export const useProfile = (userId: string) => {
  const { username, setUsername, full_name, setFullName } = useProfileStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile({ userId });
      setFullName(data?.full_name);
      setUsername(data?.username);
    };

    fetchProfile();
  }, []);

  const mutation = useMutation({
    mutationFn: (params: UpdateProfileProps) => {
      return updateProfile({ userId: params.userId, options: params.options });
    },
    meta: {
      errorMessage: `Failed to UPDATE profile of user with ID: ${userId}`,
    },
    onSuccess(data, variables, context) {
      setFullName(variables.options.full_name);
      setUsername(variables.options.username);
    },
  });

  return {
    username,
    full_name,
    mutation,
  };
};
