import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Pressable } from 'react-native';

import { useStoryCreationStore } from '@/src/services/story-creation';
import { stepStateMachine } from '@/src/services/story-creation/story-creation-utils';
import { StoryCreationStep } from '@/src/types';
import colors from '@/src/utils/colors';

const CreatorNav: React.FC<{
  step: StoryCreationStep;
  isDisabled?: boolean;
}> = ({ step, isDisabled }) => {
  const { nextStep, prevStep } = stepStateMachine(step);
  return (
    <View className="flex flex-row justify-end w-full">
      <View className="flex flex-row gap-2">
        {step !== 'age_group' && <PrevButton step={prevStep} />}
        <NextButton step={nextStep} disabled={!!isDisabled} />
      </View>
    </View>
  );
};

export default CreatorNav;

export const CloseButton: React.FC<{
  isDark?: boolean;
}> = ({ isDark = false }) => {
  const { reset } = useStoryCreationStore();

  return (
    <Link href="/user-library" onPress={reset} asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="close"
            color={isDark ? colors.black : colors.white}
            size={32}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

const NextButton: React.FC<{
  step: StoryCreationStep | null;
  disabled: boolean;
}> = ({ step, disabled }) => {
  if (step === null) return null;

  return (
    <Link href={`/creator/${step}`} asChild>
      <Pressable disabled={disabled}>
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
  step: StoryCreationStep | null;
}> = ({ step }) => {
  if (step === null) return null;

  return (
    <Link href={`/creator/${step}`} asChild>
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
