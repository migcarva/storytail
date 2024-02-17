import { ActivityIndicator } from 'react-native';
import { View } from 'tamagui';

const StartPage: React.FC = () => {
  return (
    <View f={1} alignItems="center" justifyContent="center" backgroundColor="$background">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartPage;
