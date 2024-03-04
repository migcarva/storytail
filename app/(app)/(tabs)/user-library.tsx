import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import StoriesCarousel from '@/src/components/library/StoriesCarousel';
import { useUserStories } from '@/src/hooks';
import { useAuthStore } from '@/src/services/auth';
import { isIphone, userStoriesMock } from '@/src/utils';

const UserLibraryScreen: React.FC = () => {
  const { session } = useAuthStore();
  const { stories, error, status } = useUserStories({ userId: session!.user.id });
  // console.log(stories);
  return (
    <View className="flex flex-1 items-center justify-center bg-purple">
      <Text className="text-white mt-6 mb-3 text-1.5 font-headingbold">your library</Text>
      <View className="flex flex-row gap-1 items-center justify-center bg-purple">
        <StoriesCarousel stories={userStoriesMock} />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={isIphone ? 'light' : 'auto'} />
    </View>
  );
};

export default UserLibraryScreen;
