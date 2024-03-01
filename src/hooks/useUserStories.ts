import { useUserStoriesList } from '@/src/queries';

export const useUserStories = (userId: string) => {
  const { data: stories, isLoading, error } = useUserStoriesList(userId);

  return { isLoading, error, stories };
};
