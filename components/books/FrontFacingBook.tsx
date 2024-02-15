import { Book } from '@/types';

import { Text, View } from 'tamagui';

export default function FrontFacingBook({ title, stars, ageGroup, background }: Book) {
  return (
    <View position="relative">
      <View
        alignItems="center"
        justifyContent="center"
        backgroundColor={background}
        px="$4"
        py="$5"
        borderTopLeftRadius="$3"
        borderBottomLeftRadius="$3"
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
        <Text
          fontSize="$4"
          color="$black"
          fontFamily="$heading"
          textAlign="center"
          fontWeight={'700'}>
          {title}
        </Text>
      </View>
      <View backgroundColor="$lightgrey" position="absolute" width={8} height={316} left={4} />
      <View
        backgroundColor="$grey"
        position="absolute"
        width={4}
        height={316}
        borderTopLeftRadius="$3"
        borderBottomLeftRadius="$3"
      />
    </View>
  );
}
