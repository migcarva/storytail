import { Ionicons } from '@expo/vector-icons';
import { getTokens } from '@tamagui/core';
import { Book } from '@/types';
import { Text, View } from 'tamagui';

export default function SideFacingBook({ title, stars, ageGroup, background }: Book) {
  const tokens = getTokens();
  // Ensure 'background' is a key of the 'color' object
  const bgColor = tokens.color[background as keyof typeof tokens.color].val;
  return (
    <View
      alignItems="center"
      justifyContent="center"
      backgroundColor={bgColor}
      borderRadius="$1"
      width={32}
      height={256}
      shadowColor="$black"
      shadowOpacity={0.32}
      shadowRadius={4}
      shadowOffset={{
        width: 8,
        height: 8,
      }}>
      <View
        transform={[
          {
            rotate: '-90deg',
          },
        ]}
        paddingLeft="$0.5"
        width={224}>
        <Title title={title} />
      </View>
      <View position="absolute" top={4}>
        <AgeGroup ageGroup={ageGroup} />
      </View>
      <View position="absolute" bottom={4}>
        <Rating stars={stars} />
      </View>
    </View>
  );
}

interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return (
    <Text
      fontSize="$0.875"
      color="$black"
      fontFamily="$heading"
      fontWeight={'700'}
      lineHeight="$0.875">
      {title}
    </Text>
  );
}

interface AgeGroupProps {
  ageGroup: string;
}

export function AgeGroup({ ageGroup }: AgeGroupProps) {
  return (
    <View
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="nowrap"
      flexDirection="column">
      <Ionicons name="book-outline" size={8} color={getTokens().color.black.val} style={{}} />
      <Text fontSize="$0.625" color="$black" fontFamily="$body" fontWeight={'400'}>
        {ageGroup}
      </Text>
    </View>
  );
}

interface RatingProps {
  stars: number;
}

export function Rating({ stars }: RatingProps) {
  return (
    <View
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="nowrap"
      flexDirection="row">
      <Text fontSize="$0.625" color="$black" fontFamily="$body" fontWeight={'400'}>
        {stars}
      </Text>
      <Ionicons name="star-outline" size={10} color={getTokens().color.black.val} style={{}} />
    </View>
  );
}
