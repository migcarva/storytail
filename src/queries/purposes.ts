import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/lib/supabase';
import { QUERY_KEYS } from '@/src/queries/keys';

export type Purpose = {
  id: number;
  description: string;
};

export const usePurposesList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.purpose],
    queryFn: fetchPurposes,
  });
};

const fetchPurposes = async (): Promise<Purpose[]> => {
  const { data, error } = await supabase.from(QUERY_KEYS.purpose).select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
