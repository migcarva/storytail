import { useMutation, useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/lib/supabase';
import { API_KEYS, QUERY_KEYS } from '@/src/queries/keys';

type GetProfileProps = {
  userId: string;
};

export type UpdateProfileProps = {
  userId: string;
  options: {
    username: string;
    full_name: string;
  };
};

export const useGetProfile = ({ userId }: GetProfileProps) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getProfile, userId],
    queryFn: () => getProfile({ userId }),
    meta: {
      errorMessage: `Failed to FETCH profile of user with ID: ${userId}`,
    },
  });
};

export const updateProfile = async ({ userId, options }: UpdateProfileProps) => {
  const updates = {
    id: userId,
    username: options.username,
    full_name: options.full_name,
    updated_at: new Date(),
  };

  const { error } = await supabase.from(API_KEYS.profiles).upsert(updates);

  if (error) {
    throw error;
  }
};

export const getProfile = async ({ userId }: GetProfileProps) => {
  const { data, error, status } = await supabase
    .from(API_KEYS.profiles)
    .select(`username, full_name, updated_at, avatar_url, id`)
    .eq('id', userId)
    .single();

  if (error && status !== 406) {
    throw error;
  }

  return data;
};
