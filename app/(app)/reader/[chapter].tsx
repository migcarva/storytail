import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

import ReaderNav from '@/src/components/reader/ReaderNav';
import { blurhash, bookMock } from '@/src/utils';

const Chapter: React.FC = () => {
  const { chapter } = useLocalSearchParams();
  const { chapters } = bookMock;

  if (!chapters || !chapter) return null;

  const chapterNumber = Number(chapter);

  const isLast = chapters?.length - 1 === chapterNumber;

  return (
    <View className="flex h-full relative">
      <View className="h-[60vh] bg-black">
        <Image
          className="flex-1 w-full"
          source={chapters[chapterNumber].image}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View className="h-[40vh] bg-purple px-2 pt-2">
        <Text className="text-1.25 text-white font-headingbold tracking-wide">
          {chapters[chapterNumber].text}
        </Text>
        <View className="flex justify-end items-end bottom-4 absolute left-2">
          <ReaderNav chapter={chapterNumber} isLast={isLast} />
        </View>
      </View>
    </View>
  );
};

export default Chapter;
