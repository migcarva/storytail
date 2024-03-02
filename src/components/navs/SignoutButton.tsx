import { View, Text } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { signOut } from '@/src/services/auth';

const SignoutButton: React.FC = () => {
  return (
    <Button variant="outline" onPress={signOut}>
      <View className="flex flex-row gap-0.5 justify-center items-center px-0.5">
        <Text className="text-1.25 text-black font-bodybold">Sign out</Text>
      </View>
    </Button>
  );
};

export default SignoutButton;
