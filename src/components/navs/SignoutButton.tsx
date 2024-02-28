import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text } from 'react-native';

import { useSupabase } from '@/src/hooks/useSupabase';

const SignoutButton: React.FC = () => {
  const { signOut } = useSupabase();

  return (
    <Pressable onPress={signOut} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} className="text-black" />
      <Text className="text-xl text-black">
        {/* Welcome, {user?.firstName} {user?.lastName} 🎉 */}
        Sign out
      </Text>
    </Pressable>
  );
};

export default SignoutButton;
