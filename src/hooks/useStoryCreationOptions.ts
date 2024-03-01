import { useAgeGroupsList, usePurposesList } from '@/src/queries';

export const useStoryCreationOptions = () => {
  const { data: purposes, isLoading: purposesLoading, error: purposesError } = usePurposesList();
  const {
    data: ageGroups,
    isLoading: ageGroupsLoading,
    error: ageGroupsError,
  } = useAgeGroupsList();

  const isLoading = purposesLoading || ageGroupsLoading;
  const error = purposesError || ageGroupsError;
  return { isLoading, error, purposes, ageGroups };
};
