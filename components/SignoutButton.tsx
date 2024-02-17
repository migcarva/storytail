import { useAuth } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { getTokens } from 'tamagui';

const SignoutButton: React.FC = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={getTokens().color.black.val} />
    </Pressable>
  );
};

export default SignoutButton;
