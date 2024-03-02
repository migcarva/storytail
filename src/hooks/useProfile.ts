import { updateProfile, useGetProfile, useUpdateProfile } from '@/src/services/profile';

export const useProfile = (userId: string) => {
  const { data: profile, error, isLoading } = useGetProfile({ userId });
  const {
    data: updatedProfile,
    error: updateError,
    isLoading: updateIsLoading,
  } = useUpdateProfile({ userId });

  const requestProfileUpdate = async ({
    username,
    full_name,
  }: {
    username: string;
    full_name: string;
  }) => {
    const options = {
      username,
      full_name,
    };
    await updateProfile({ userId, options });
  };

  return {
    username: profile?.username,
    fullName: profile?.full_name,
    id: profile?.id,
    updatedAt: profile?.updated_at,
    requestProfileUpdate,
    isLoading: isLoading,
    error: error,
  };
};
