import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { CloseButton } from '@/src/components/reader/ReaderNav';
import colors from '@/src/utils/colors';

const GeneratingStory: React.FC = () => {
  return (
    <View className="flex px-2 pt-6 h-full relative bg-purple">
      <View className="flex mb-4 flex-row justify-between ">
        <CloseButton isNav={false} />
      </View>
      <Text className="text-2.5 text-white font-heading w-[300px]">The end!</Text>
      <View className="flex">
        <Text className="text-1.25 text-white font-heading w-[300px]">rate this story</Text>
        {[...Array(5).keys()].map((s) => (
          <Ionicons name="close" color={colors.white} size={32} key={s} />
        ))}
      </View>
    </View>
  );
};

export default GeneratingStory;
