import { Pressable, Text, View } from 'react-native';

import { useSupabase } from '@/src/hooks/useSupabase';

const SignoutButton: React.FC = () => {
  const { signOut } = useSupabase();

  return (
    <Pressable onPress={signOut} style={{ marginRight: 10 }}>
      <View className="flex flex-row">
        <Text className="text-xl text-black">
          {/* Welcome, {user?.firstName} {user?.lastName} 🎉 */}
          Sign out
        </Text>
      </View>
    </Pressable>
  );
};

export default SignoutButton;
