import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';

import BooksCarousel from '@/src/components/books/BooksCarousel';
import { userStories } from '@/src/utils/mocks';

const UserLibraryScreen: React.FC = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-purple">
      <Text className="text-white mt-6 mb-3 text-1.5 font-headingbold">your library</Text>
      <View className="flex flex-row gap-1 items-center justify-center bg-purple">
        <BooksCarousel books={userStories} />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default UserLibraryScreen;
