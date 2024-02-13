import { Text, View } from 'tamagui';

export default function UserLibraryScreen() {
  return (
    <View f={1} alignItems='center' justifyContent='center' backgroundColor="$accent">
      <Text fontSize="$2" color="$white" fontFamily="$heading">User Library</Text>
    </View>
  );
}
