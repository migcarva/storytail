import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { CloseButton } from '@/src/components/reader/ReaderNav';
import colors from '@/src/utils/colors';

const TheEnd: React.FC = () => {
  const [stars, setStars] = useState(0);
  const handleSelect = (n: number) => {
    setStars(n === stars ? 0 : n);
  };
  return (
    <View className="flex-1 px-2 pt-6 w-full h-full bg-purple relative">
      <View className="flex mb-4 flex-row justify-between">
        <CloseButton isNav={false} />
      </View>

      <View className="flex w-full justify-center items-center pb-8">
        <Text className="text-2.5 text-white font-headingbold">The end!</Text>
      </View>

      <View className="flex justify-center items-center gap-2">
        <Text className="text-2 text-white font-body">rate this story</Text>
        <View className="flex flex-row">
          {[...Array(5).keys()].map((s) => (
            <Pressable onTouchEnd={() => handleSelect(s + 1)}>
              {({ pressed }) => {
                const isSelected = s + 1 <= stars;
                return (
                  <Ionicons
                    name={isSelected ? 'star' : 'star-outline'}
                    className="px-1"
                    color={isSelected ? colors.orange : colors.white}
                    size={32}
                    key={s}
                  />
                );
              }}
            </Pressable>
          ))}
        </View>
      </View>

      <View className="flex w-full justify-center items-center absolute bottom-6 left-2">
        <Ionicons
          name="share-social-outline"
          className="px-1 pb-1"
          color={colors.white}
          size={32}
        />
        <Text className="text-1.25 text-white font-body">share with friends</Text>
      </View>
    </View>
  );
};

export default TheEnd;
