import { StyleSheet } from 'react-native';
import { Text, View } from 'tamagui';

export default function TabOneScreen() {
  return (
    <View f={1} alignItems='center' justifyContent='center' backgroundColor="$accent">
      <Text fontSize="$2" color="$white">User Library</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
