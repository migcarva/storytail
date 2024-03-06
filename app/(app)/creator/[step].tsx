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
import colors from '@/src/utils/colors';
import { useUserStoriesStore } from '@/src/services/user-stories';
import { randomiseBackgroundColor } from '@/src/utils/story';

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

interface StoryChapters {
  [key: string]: string;
}

type StepProps<T, K extends keyof OptionTypes> = {
  setter: Dispatch<SetStateAction<T>>;
  value: T;
  question: string;
  type: K;
  options?: OptionTypes[K];
};

const CreationStep: React.FC = () => {
  const { session } = useAuthStore();
  const { addStory, addChapters } = useUserStoriesStore();

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

  const stepNumber: number = Number(step);
  const stepProps = getStepProps(stepNumber);

  useEffect(() => {
    const requestStoryGeneration = async () => {
      const userId = session?.user.id;
      const generatedStory = await generateStory({
        age_group_id: parseInt(ageGroup, 10),
        purpose_id: parseInt(purpose, 10),
        prompt,
      });

      if (generatedStory && userId) {
        const storyObj = {
          prompt,
          title: generatedStory.title,
          summary: generatedStory.summary,
          dedication: to,
          background_color: randomiseBackgroundColor(),
          is_premium: false,
          is_published: false,
          age_group_id: parseInt(ageGroup, 10),
          purpose_id: parseInt(purpose, 10),
        };

        const story = await addStory(userId, storyObj);

        if (story.id) {
          const chaptersArray = Object.keys(generatedStory.chapters).map((key) => {
            const chapterNumber = parseInt(key.replace('chapter', ''), 10); // Extract the chapter number
            return {
              chapter_number: chapterNumber,
              content: (generatedStory.chapters as StoryChapters)[key],
              title: 'chapter_title',
              image_url: 'image_url',
            };
          });

          addChapters(userId, story.id, chaptersArray);
        }
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
