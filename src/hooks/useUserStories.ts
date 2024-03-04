import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/queries/keys';
import { getStories } from '@/src/services/user-stories';

export const useUserStories = ({ userId }: { userId: string }) => {
  const {
    data: stories,
    status,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.userStories, userId],
    queryFn: () => getStories({ userId }),
  });

  return {
    stories,
    status,
    error,
  };
};
