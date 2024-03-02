import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Pressable, Text } from 'react-native';

import colors from '@/src/utils/colors';

const GoBackButton: React.FC<{
  path: string;
}> = ({ path }) => (
  <Link href={path} className="" asChild>
    <Pressable>
      {({ pressed }) => (
        <View className="flex flex-row gap-0.5 items-center">
          <Ionicons
            name="chevron-back-outline" // Cast to `any` to bypass the type checking issue
            size={16}
            color={colors.black}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
          <Text className="font-body text-1.25 text-black" style={{ opacity: pressed ? 0.5 : 1 }}>
            back
          </Text>
        </View>
      )}
    </Pressable>
  </Link>
);

export default GoBackButton;
