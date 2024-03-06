import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/lib/keys';
import { useUserStoriesStore } from '@/src/services/user-stories';

export const useUserStories = ({ userId }: { userId: string }) => {
  const { getStories, getStoriesSummaries } = useUserStoriesStore();
  const {
    data: stories,
    status: fetchStoriesStatus,
    error: fetchStoriesError,
  } = useQuery({
    queryKey: [QUERY_KEYS.userStories, userId],
    queryFn: () => getStories(userId),
  });

  const {
    data: summaries,
    status: fetchSummariesStatus,
    error: fetchSummariesError,
  } = useQuery({
    queryKey: [QUERY_KEYS.userStoriesSummaries, userId],
    queryFn: () => getStoriesSummaries(userId),
  });

  return {
    stories,
    fetchStoriesStatus,
    fetchStoriesError,
    summaries,
    fetchSummariesStatus,
    fetchSummariesError,
  };
};
