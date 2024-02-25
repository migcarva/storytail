import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';

import SearchFrontFacingBook from '@/src/components/books/SearchFrontFacingBook';
import { userStories } from '@/src/utils/mocks';

const FilteredBookList: React.FC = () => {
  const [group, setSelectedGroup] = useState(0);
  const [starsAsc, setStarsAsc] = useState(true);

  return (
    <View className="w-full pb-0.25 mb-1.5">
      <View className="w-full border-b border-black border-solid pb-0.25">
        <View className="flex flex-row py-0.5 items-center rounded-full justify-between">
          <View className="flex flex-row items-center" onTouchEnd={() => setStarsAsc(!starsAsc)}>
            <Ionicons name="star-outline" size={16} />
            <Text className="px-0.25 text-1 font-bodybold">stars</Text>
            {starsAsc ? (
              <Ionicons name="chevron-up" size={16} />
            ) : (
              <Ionicons name="chevron-down" size={16} />
            )}
          </View>
          <View className="flex flex-row items-center">
            <View
              className="flex flex-row items-center mr-1"
              onTouchEnd={() => {
                setSelectedGroup(group === 1 ? 0 : 1);
              }}>
              <Ionicons name={group === 1 ? 'book' : 'book-outline'} size={16} />
              <Text className="px-0.25 text-1 font-bodybold">1-4</Text>
            </View>
            <View
              className="flex flex-row items-center mr-1"
              onTouchEnd={() => {
                setSelectedGroup(group === 2 ? 0 : 2);
              }}>
              <Ionicons name={group === 2 ? 'book' : 'book-outline'} size={16} />
              <Text className="px-0.25 text-1 font-bodybold">5-8</Text>
            </View>
            <View
              className="flex flex-row items-center mr-1"
              onTouchEnd={() => {
                setSelectedGroup(group === 3 ? 0 : 3);
              }}>
              <Ionicons name={group === 3 ? 'book' : 'book-outline'} size={16} />
              <Text className="px-0.25 text-1 font-bodybold">9-12</Text>
            </View>
          </View>
        </View>
      </View>
      <SafeAreaView>
        <ScrollView className="pt-3 mb-4">
          <View className="flex flex-row flex-wrap gap-3 justify-center">
            {userStories.map((book) => (
              <SearchFrontFacingBook
                id={book.id}
                title={book.title}
                stars={book.stars}
                ageGroup={book.ageGroup}
                background={book.background}
              />
            ))}
            <View className="h-8" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FilteredBookList;
