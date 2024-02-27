import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Pressable } from 'react-native';

import colors from '@/src/utils/colors';

const ReaderNav: React.FC<{
  chapter: number;
  isLast?: boolean;
}> = ({ chapter, isLast = false }) => {
  return (
    <View className="flex flex-row justify-between w-full">
      <View className="flex">{chapter > -1 && <CloseButton />}</View>
      <View className="flex flex-row gap-2">
        {chapter > -1 && <PrevButton chapter={chapter - 1} />}
        {!isLast && <NextButton chapter={chapter + 1} />}
        {isLast && <NextButton chapter="the-end" />}
      </View>
    </View>
  );
};

export default ReaderNav;

export const CloseButton: React.FC<{
  isNav?: boolean;
}> = ({ isNav = true }) => {
  return (
    <Link href="/user-library" asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="close"
            color={colors.white}
            size={isNav ? 48 : 32}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

const NextButton: React.FC<{
  chapter: number | string;
}> = ({ chapter }) => {
  return (
    <Link href={`/reader/${chapter}`} asChild>
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
  chapter: number;
}> = ({ chapter }) => {
  return (
    <Link href={`/reader/${chapter < 0 ? 'intro' : chapter}`} asChild>
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
