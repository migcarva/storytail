import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

import CharactersCarousel from '@/src/components/creator/CharactersCarousel';
import { CloseButton } from '@/src/components/creator/CreatorNav';
import colors from '@/src/utils/colors';

import '@/src/assets/images/character.png';

const MainCharacterSelection: React.FC = () => {
  return (
    <View className="flex px-2 pt-6 h-full relative bg-white">
      <View className="flex mb-4 flex-row justify-between ">
        <CloseButton isDark />
      </View>
      <View className="flex w-full items-center pb-1">
        <Text className="text-2.5 text-black text-center font-heading w-[300px]">
          Pick the main character
        </Text>
      </View>
      <View className="flex pb-1 relative -translate-x-2">
        <CharactersCarousel charactersUrl={['111', '111', '1111']} />
      </View>
      <View className="flex w-full items-center">
        <Text className="text-1.25 text-black text-center font-heading w-[300px]">
          we'll use the selection style to illustrate the story
        </Text>
      </View>
      <View className="flex justify-end items-end bottom-4 absolute right-2">
        <Link href="/creator/generating" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="chevron-forward-outline"
                color={colors.black}
                size={48}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default MainCharacterSelection;
