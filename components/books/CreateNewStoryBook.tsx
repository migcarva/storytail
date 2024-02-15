import { Text, View } from 'tamagui';

interface CreateNewStoryBookProps {
  isFirst: boolean;
}

export default function CreateNewStoryBook({ isFirst }: CreateNewStoryBookProps) {
  const displayText = isFirst ? 'create your first story' : 'create a new story';
  const bookHeight = 316;
  return (
    <View position="relative">
      <View
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
        px="$4"
        py="$5"
        borderTopLeftRadius={2}
        borderBottomLeftRadius={2}
        borderTopRightRadius="$3"
        borderBottomRightRadius="$3"
        width={214}
        height={bookHeight}
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
          {displayText}
        </Text>
      </View>
      <View backgroundColor="$grey" position="absolute" width={4} height={bookHeight} left={2} />
      <View
        backgroundColor="$lightgrey"
        position="absolute"
        width={4}
        height={bookHeight}
        left={4}
      />
    </View>
  );
}
