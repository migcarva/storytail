import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Pressable } from 'react-native';

import colors from '@/src/utils/colors';

const CloseButton: React.FC<{
  path?: string;
}> = ({ path = '/user-library' }) => (
  <Link href={path} className="" asChild>
    <Pressable>
      {({ pressed }) => (
        <View className="flex flex-row gap-0.5 items-center">
          <Ionicons
            name="close" // Cast to `any` to bypass the type checking issue
            size={24}
            color={colors.black}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        </View>
      )}
    </Pressable>
  </Link>
);

export default CloseButton;
