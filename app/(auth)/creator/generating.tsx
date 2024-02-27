import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import colors from '@/src/utils/colors';

const Generating: React.FC = () => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDone(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (done) {
      setTimeout(() => {
        router.replace('/creator/result');
      }, 2000);
    }
  }, [done]);

  return (
    <View className="flex h-full bg-white justify-center items-center">
      <View className="flex items-center pb-4">
        <Ionicons
          name={done ? 'checkmark-done-outline' : 'color-palette-outline'}
          color={done ? colors.blue : colors.black}
          size={64}
        />
      </View>
      <View className="flex items-center">
        <Text className="text-2.5 text-center text-black font-headingbold w-[300px]">
          Get ready!
        </Text>
        <Text className="text-2.5 text-center text-black font-heading w-[300px]">
          we're painting your amazing story
        </Text>
      </View>
    </View>
  );
};

export default Generating;
