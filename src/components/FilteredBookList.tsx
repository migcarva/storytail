import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';

import SearchFrontFacingBook from '@/src/components/books/SearchFrontFacingBook';
import { userStoriesMock } from '@/src/utils';

const FilteredBookList: React.FC = () => {
  const [group, setSelectedGroup] = useState(0);
  const [starsAsc, setStarsAsc] = useState(true);
  const [filteredStories, setFilteredStories] = useState(userStoriesMock);

  // useEffect(() => {
  //   if (group === 1) {
  //     const allStories = [...filteredStories];
  //     const sortedStories = allStories.sort((a, b) => {
  //       if (a.ageGroup === '1-4') return -1;
  //       if (b.ageGroup === '1-4') return 1;
  //       return a.title.localeCompare(b.title);
  //     });
  //     setFilteredStories(sortedStories);
  //   }

  //   if (group === 2) {
  //     const allStories = [...filteredStories];
  //     const sortedStories = allStories.sort((a, b) => {
  //       if (a.ageGroup === '5-8') return -1;
  //       if (b.ageGroup === '5-8') return 1;
  //       return a.title.localeCompare(b.title);
  //     });
  //     setFilteredStories(sortedStories);
  //   }

  //   if (group === 3) {
  //     const allStories = [...filteredStories];
  //     const sortedStories = allStories.sort((a, b) => {
  //       if (a.ageGroup === '9-12') return -1;
  //       if (b.ageGroup === '9-12') return 1;
  //       return a.title.localeCompare(b.title);
  //     });
  //     setFilteredStories(sortedStories);
  //   }
  // }, [group, filteredStories]);

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
        {userStoriesMock.length > 0 && (
          <ScrollView className="pt-3 mb-4">
            <View className="flex flex-row flex-wrap gap-2.5 justify-center">
              {userStoriesMock.map((story) => (
                <SearchFrontFacingBook
                  id={story.id}
                  title={story.title}
                  stars={story.stars}
                  ageGroup={story.ageGroup}
                  background={story.background}
                  key={story.id}
                />
              ))}
              <View className="h-8" />
            </View>
          </ScrollView>
        )}
        {filteredStories.length === 0 && (
          <View className="h-10 flex justify-center items-center">
            <Text className="text-2 font-bodybold">No stories to show</Text>
            <Text className="text-1.25 font-body">Create a new story!</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default FilteredBookList;
