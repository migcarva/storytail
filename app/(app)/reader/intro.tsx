import { View, Text } from 'react-native';

import ReaderNav, { CloseButton } from '@/src/components/reader/ReaderNav';
import { bookMock } from '@/src/utils';

const Intro: React.FC = () => {
  const { title } = bookMock;
  return (
    <View className="flex px-2 pt-6 h-full relative bg-purple">
      <View className="flex mb-4 flex-row justify-between ">
        <CloseButton isNav={false} />
      </View>
      <Text className="text-2.5 text-white font-heading w-[300px]">{title}</Text>
      <View className="flex justify-end items-end bottom-4 absolute left-2">
        {/* -1 because is the intro page. chapter 0 is the first entry */}
        <ReaderNav chapter={-1} />
      </View>
    </View>
  );
};

export default Intro;
