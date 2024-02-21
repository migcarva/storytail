import { Ionicons } from '@expo/vector-icons';
import { Text, View, getTokens } from 'tamagui';

import { Book } from '@/src/types';

const FrontFacingBook: React.FC<Book> = ({ title, stars, ageGroup, background }) => {
  const tokens = getTokens();

  // Ensure 'background' is a key of the 'color' object
  const bgColor = tokens.color[background as keyof typeof tokens.color].val;

  return (
    <View position="relative">
      <View
        alignItems="center"
        justifyContent="center"
        backgroundColor={bgColor}
        px="$4"
        py="$5"
        borderTopLeftRadius="$1"
        borderBottomLeftRadius="$1"
        borderTopRightRadius="$4"
        borderBottomRightRadius="$4"
        width={214}
        height={316}
        shadowColor="$black"
        shadowOpacity={0.32}
        shadowRadius={8}
        shadowOffset={{
          width: 16,
          height: 64,
        }}>
        <View position="absolute" top={8}>
          <AgeGroup ageGroup={ageGroup} />
        </View>
        <Title title={title} />
        <View position="absolute" bottom={8}>
          <Rating stars={stars} />
        </View>
      </View>
      <View backgroundColor="$lightgrey" position="absolute" width={8} height={316} left={4} />
      <View
        backgroundColor="$grey"
        position="absolute"
        width={4}
        height={316}
        borderTopLeftRadius="$1"
        borderBottomLeftRadius="$1"
      />
    </View>
  );
};

export default FrontFacingBook;

const Title: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Text fontSize="$3" color="$black" fontFamily="$heading" textAlign="center" fontWeight={'700'}>
      {title}
    </Text>
  );
};

const AgeGroup: React.FC<{
  ageGroup: string;
}> = ({ ageGroup }) => {
  if (ageGroup.length === 0) return null;

  return (
    <View
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="nowrap"
      flexDirection="column">
      <Ionicons name="book-outline" size={16} color={getTokens().color.black.val} style={{}} />
      <Text fontSize="$1" color="$black" fontFamily="$body" fontWeight={'400'}>
        {ageGroup}
      </Text>
    </View>
  );
};

const Rating: React.FC<{
  stars: number;
}> = ({ stars }) => {
  if (stars === 0) return null;

  return (
    <View
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="nowrap"
      flexDirection="row">
      {Array.from({ length: stars }, (_, index) => (
        <Ionicons
          key={index}
          name="star-outline"
          size={16}
          color={getTokens().color.black.val}
          style={{}}
        />
      ))}
    </View>
  );
};
