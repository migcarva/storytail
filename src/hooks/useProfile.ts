import { useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/queries/keys';
import { updateProfile, getProfile, UpdateProfileProps } from '@/src/services/profile';

export const useProfile = (userId: string) => {
  const {
    data: profile,
    error,
    status,
  } = useQuery({
    queryKey: [QUERY_KEYS.getProfile, userId],
    queryFn: () => getProfile({ userId }),
    meta: {
      errorMessage: `Failed to FETCH profile of user with ID: ${userId}`,
    },
    gcTime: 1 * 1000, // 1 second
  });

  const mutation = useMutation({
    mutationFn: (params: UpdateProfileProps) => {
      return updateProfile({ userId: params.userId, options: params.options });
    },
    meta: {
      errorMessage: `Failed to UPDATE profile of user with ID: ${userId}`,
    },
  });

  return {
    username: profile?.username,
    fullName: profile?.full_name,
    id: profile?.id,
    updatedAt: profile?.updated_at,
    error,
    status,
    mutation,
  };
};
