import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/lib/supabase';
import { API_KEYS, QUERY_KEYS } from '@/src/queries/keys';

export type AgeGroup = {
  id: number;
  description: string;
  min_age: number;
  max_age: number;
};

export const useAgeGroupsList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ageGroups],
    queryFn: fetchAgeGroups,
  });
};

const fetchAgeGroups = async (): Promise<AgeGroup[]> => {
  const { data, error } = await supabase.from(API_KEYS.ageGroups).select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
