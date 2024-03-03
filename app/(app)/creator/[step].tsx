import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { Book } from '@/src/components/creator/CreatorBook';
import CreatorNav, { CloseButton } from '@/src/components/creator/CreatorNav';
import StepPage from '@/src/components/creator/StepPage';
import { AGE_GROUPS, STORY_PURPOSES_TYPES } from '@/src/lib/constants';
import { useAuthStore } from '@/src/services/auth';
import { generateStory } from '@/src/services/open-ai/open-ai.queries';
import { addNewStory } from '@/src/services/user-stories';
import colors from '@/src/utils/colors';

type SelectOption = {
  value: string;
  text: string;
};

type InputConfig = {
  placeholder?: string;
};

interface OptionTypes {
  input: InputConfig;
  select: SelectOption[];
  multiselect: SelectOption[];
}

type StepProps<T, K extends keyof OptionTypes> = {
  setter: Dispatch<SetStateAction<T>>;
  value: T;
  question: string;
  type: K;
  options?: OptionTypes[K];
};

const CreationStep: React.FC = () => {
  const { user } = useAuthStore();
  const { step } = useLocalSearchParams();
  const [to, setTo] = useState('');
  const [ageGroup, setAgeGroup] = useState('0');
  const [prompt, setPrompt] = useState('');
  const [purpose, setPurpose] = useState('0');

  const [done, setDone] = useState(false);

  const getStepProps = (step: number) => {
    let stepProps: StepProps<string, keyof OptionTypes>;
    switch (step) {
      case 1:
        stepProps = {
          value: to,
          setter: setTo,
          type: 'input',
          question: 'This story is dedicated to',
          options: {
            placeholder: "your kid's name",
          },
        };
        break;
      case 2:
        stepProps = {
          value: ageGroup,
          setter: setAgeGroup,
          type: 'select',
          question: `Select ${to}'s age group?`,
          options: AGE_GROUPS.map((a) => ({
            value: a.id.toString(),
            text: `${a.description} (${a.min_age}-${a.max_age})`,
          })),
        };
        break;
      case 3:
        stepProps = {
          value: prompt,
          setter: setPrompt,
          type: 'input',
          question: "What's this story about?",
          options: {
            placeholder: 'be criative',
          },
        };
        break;
      case 4:
        stepProps = {
          value: purpose,
          setter: setPurpose,
          type: 'select',
          question: "What's the purpose of the story?",
          options: STORY_PURPOSES_TYPES?.map((p) => ({
            value: p.id.toString(),
            text: p.description,
          })),
        };
        break;
    }

    return stepProps!;
  };

  const stepNumber = Number(step);
  const stepProps = getStepProps(stepNumber);

  useEffect(() => {
    const requestStoryGeneration = async () => {
      const story = await generateStory({
        age_group_id: parseInt(ageGroup, 10),
        purpose_id: parseInt(purpose, 10),
        prompt,
      });
      console.log('USE EFFECT :: STORY', story);

      if (story) {
        const storyObj = {
          prompt,
          title: story.title,
          summary: story.summary,
          dedication: to,
          background_color: colors.blue,
          is_premium: false,
          is_published: false,
          age_group_id: parseInt(ageGroup, 10),
          purpose_id: parseInt(purpose, 10),
        };
        const data = await addNewStory({ user_id: user!.id, story: storyObj });
        console.log('USE EFFECT :: DATA', data);

        const data = {
          chapters: {
            chapter1:
              'Alan wakes up one morning feeling something missing. He looks around and notices a missing feather.',
            chapter2:
              'Determined to find his missing feather, Alan sets out on an adventure through the meadow.',
            chapter3:
              'Along the way, Alan meets new friends like a fluffy bunny and a colorful butterfly.',
            chapter4:
              'With the help of his new friends, Alan finally finds his missing feather and feels whole again.',
          },
          description:
            'Alan is a fluffy blue chicken with bright yellow feathers and a determined look in his eye.',
          summary:
            'Alan the brave blue chicken goes on a grand adventure to find his missing feather.',
          title: 'Alan the Brave Blue Chicken',
        };
      }
    };

    if (stepNumber === 5) {
      requestStoryGeneration();
      setTimeout(() => {
        setDone(true);
      }, 3000);
    }
  }, [stepNumber]);

  useEffect(() => {
    if (done) {
      setTimeout(() => {
        router.replace('/creator/main-character');
      }, 2000);
    }
  }, [done]);

  if (stepNumber === 5) {
    return (
      <View className="flex px-2 pt-6 h-full relative bg-purple">
        <View className="flex mb-6 flex-row justify-between " />
        <Book className="-rotate-8 mt-3">
          <View className="flex justify-center items-center gap-4">
            <Ionicons
              name={done ? 'checkmark-done-outline' : 'finger-print-outline'}
              color={colors.black}
              size={64}
            />
            <Text className="text-2 font-headingbold text-center pb-0.5 px-4">
              We're generating your amazing story
            </Text>
          </View>
        </Book>
      </View>
    );
  }

  if (!stepProps) return null;

  return (
    <View className="flex h-full relative bg-purple px-2 pt-6">
      <CloseButton />
      <View className="flex flex-row">
        <StepPage
          type={stepProps.type}
          value={stepProps.value}
          setter={stepProps.setter}
          question={stepProps.question}
          options={stepProps.options}
        />
      </View>
      <View className="flex justify-end items-end bottom-4 absolute left-2">
        {/* -1 because is the intro page. chapter 0 is the first entry */}
        <CreatorNav step={stepNumber} isDisabled={!stepProps.value} />
      </View>
    </View>
  );
};

export default CreationStep;
