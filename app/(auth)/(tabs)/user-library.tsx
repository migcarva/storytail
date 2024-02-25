import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import BooksCarousel from '@/src/components/books/BooksCarousel';
import { userStories } from '@/src/utils/mocks';

const UserLibraryScreen: React.FC = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-purple">
      <Text className="text-white mt-6 mb-3 text-1.5 font-headingbold">your library</Text>
      <View className="flex flex-row gap-1 items-center justify-center bg-purple">
        <BooksCarousel books={userStories} />
      </View>

      <StatusBar style="light" />
    </View>
  );
};

export default UserLibraryScreen;
