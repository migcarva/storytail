import { ActivityIndicator, View } from 'react-native';

const StartPage: React.FC = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="#513175" />
    </View>
  );
};

export default StartPage;
