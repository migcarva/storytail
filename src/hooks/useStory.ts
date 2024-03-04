import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/queries/keys';
import { getStory } from '@/src/services/user-stories';

export const useStory = ({ userId, storyId }: { userId: string; storyId: string }) => {
  const {
    data: story,
    status,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.story, userId, storyId],
    queryFn: () => getStory({ userId, storyId }),
  });

  return {
    story,
    status,
    error,
  };
};
