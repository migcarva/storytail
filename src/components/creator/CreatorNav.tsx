import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Pressable } from 'react-native';

import colors from '@/src/utils/colors';

const CreatorNav: React.FC<{
  step: number;
  isLast?: boolean;
}> = ({ step, isLast = false }) => {
  return (
    <View className="flex flex-row justify-end w-full">
      <View className="flex flex-row gap-2">
        {step > 1 && <PrevButton step={step - 1} />}
        <NextButton step={step + 1} />
      </View>
    </View>
  );
};

export default CreatorNav;

export const CloseButton: React.FC = () => {
  return (
    <Link href="/creator" asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="close"
            color={colors.white}
            size={32}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

const NextButton: React.FC<{
  step: number | string;
}> = ({ step }) => {
  return (
    <Link href={`/creator/${step}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="chevron-forward-outline"
            color={colors.white}
            size={48}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

const PrevButton: React.FC<{
  step: number;
}> = ({ step }) => {
  return (
    <Link href={`/creator/${step < 0 ? 'intro' : step}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="chevron-back-outline"
            color={colors.white}
            size={48}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};
