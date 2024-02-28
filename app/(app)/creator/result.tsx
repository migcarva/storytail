import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

import FrontFacingBook from '@/src/components/books/FrontFacingBook';
import { CloseButton } from '@/src/components/creator/CreatorNav';
import colors from '@/src/utils/colors';

const FinalResult: React.FC = () => {
  return (
    <View className="flex  px-2 pt-6 h-full bg-purple">
      <View className="flex mb-4 flex-row justify-between ">
        <CloseButton />
      </View>
      <View className="flex items-center pb-4">
        <Text className="text-2.5 text-center text-white font-headingbold w-[300px]">
          Do you want to review the story?
        </Text>
      </View>

      <View className="flex items-center pb-8">
        <FrontFacingBook
          id={0}
          title="Just show it to me!"
          stars={0}
          ageGroup=""
          background={colors.white}
        />
      </View>

      <View className="flex items-center">
        <Link href="reader">
          <Pressable>
            {({ pressed }) => (
              <Text className="text-1.25 text-center underline text-white font-heading w-[300px]">
                Yes, let me review it
              </Text>
            )}
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default FinalResult;
