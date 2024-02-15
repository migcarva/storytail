import CreateNewStoryBook from '@/components/CreateNewStory';
import { Text, View } from 'tamagui';

export default function UserLibraryScreen() {
  return (
    <View f={1} alignItems="center" justifyContent="center" backgroundColor="$accent">
      <Text fontSize="$3" color="$white" fontFamily="$heading" fontWeight={'700'} marginBottom={96}>
        your library
      </Text>
      <CreateNewStoryBook isFirst={true} />
    </View>
  );
}
