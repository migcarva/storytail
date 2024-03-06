import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';

import StoriesCarousel from '@/src/components/library/StoriesCarousel';
import { useUserStories } from '@/src/hooks';
import { useAuthStore } from '@/src/services/auth';
import { isIphone } from '@/src/utils';

const UserLibraryScreen: React.FC = () => {
  const { session } = useAuthStore();
  const { summaries, fetchSummariesStatus, fetchSummariesError } = useUserStories({
    userId: session!.user.id,
  });
  if (fetchSummariesStatus === 'pending') {
  }
  return (
    <View className="flex flex-1 items-center justify-center bg-purple">
      <Text className="text-white mt-6 mb-3 text-1.5 font-headingbold">your library</Text>

      <View className="flex flex-row gap-1 items-center justify-center">
        {fetchSummariesStatus === 'pending' && <ActivityIndicator size="small" />}
        {fetchSummariesStatus === 'error' && fetchSummariesError && (
          <Text>{fetchSummariesError?.message}</Text>
        )}
        {fetchSummariesStatus === 'success' && summaries && (
          <StoriesCarousel summaries={summaries} />
        )}
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={isIphone ? 'light' : 'auto'} />
    </View>
  );
};

export default UserLibraryScreen;
