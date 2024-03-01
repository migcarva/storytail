import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/lib/supabase';
import { API_KEYS, QUERY_KEYS } from '@/src/queries/keys';

export type Story = {
  id: number;
  user_id: string;
  title: string;
  description: string;
  dedication: string;
  prompt: string;
  is_premium: boolean;
  published: boolean;

  purpose_id: number;
  age_group_id: number;
  background_color_id: number;

  created_at: string;
  updated_at: string;
};

export const useUserStoriesList = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.userStories, userId],
    queryFn: () => fetchUserStories(userId),
  });
};

const fetchUserStories = async (userId: string): Promise<Story[]> => {
  const { data, error } = await supabase.from(API_KEYS.stories).select('*').eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
