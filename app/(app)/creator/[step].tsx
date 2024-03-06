import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { Book } from '@/src/components/creator/CreatorBook';
import CreatorNav, { CloseButton } from '@/src/components/creator/CreatorNav';
import StepPage from '@/src/components/creator/StepPage';
import { AGE_GROUPS, STORY_PURPOSES_TYPES } from '@/src/lib/constants';
import { useAuthStore } from '@/src/services/auth';
import { generateStory } from '@/src/services/open-ai/open-ai.queries';
import { useStoryCreationStore } from '@/src/services/story-creation';
import { getStepFromSearchParams } from '@/src/services/story-creation/story-creation-utils';
import { OptionTypes, StepProps, StoryChapters, StoryCreationStep } from '@/src/types';
import colors from '@/src/utils/colors';
import { randomiseBackgroundColor } from '@/src/utils/story';

const CreationStep: React.FC = () => {
  const { session } = useAuthStore();
  const [isGenerated, setIsGenerateed] = useState(false);
  const { step: stepParam } = useLocalSearchParams();

  const step = getStepFromSearchParams(stepParam);
  console.log('step >>> ', step);

  const {
    dedication,
    setDedication,
    age_group_id,
    setAgeGroupId,
    prompt,
    setPrompt,
    purpose_id,
    setPurposeId,
    generatedStory,
    setGeneratedStory,
    story,
    chapters,
    addStory,
    addChapters,
  } = useStoryCreationStore();

  const getStepProps = (step: StoryCreationStep) => {
    let stepProps: StepProps<string, keyof OptionTypes>;
    switch (step) {
      case 'dedication':
        stepProps = {
          type: 'input',
          value: dedication,
          setter: setDedication,
          question: 'This story is dedicated to',
          options: {
            placeholder: "your kid's name",
          },
          nextStep: 'age_group',
        };
        break;
      case 'age_group':
        stepProps = {
          type: 'select',
          value: age_group_id,
          setter: setAgeGroupId,
          question: `Select ${dedication}'s age group?`,
          options: AGE_GROUPS.map((a) => ({
            value: a.id.toString(),
            text: `${a.description} (${a.min_age}-${a.max_age})`,
          })),
          nextStep: 'prompt',
        };
        break;
      case 'prompt':
        stepProps = {
          type: 'input',
          value: prompt,
          setter: setPrompt,
          question: "What's this story about?",
          options: {
            placeholder: 'be criative',
          },
          nextStep: 'purpose',
        };
        break;
      case 'purpose':
        stepProps = {
          type: 'select',
          value: purpose_id,
          setter: setPurposeId,
          question: "What's the purpose of the story?",
          options: STORY_PURPOSES_TYPES?.map((p) => ({
            value: p.id.toString(),
            text: p.description,
          })),
          nextStep: 'story_generation',
        };
        break;
    }

    return stepProps!;
  };

  const stepProps = getStepProps(step as StoryCreationStep);

  const requestStoryGeneration = async () => {
    const storyAlreadyGenerated = generatedStory !== null;
    if (storyAlreadyGenerated) return generatedStory;

    const newGeneratedStory = await generateStory({
      age_group_id: parseInt(age_group_id, 10),
      purpose_id: parseInt(purpose_id, 10),
      prompt,
    });
    if (newGeneratedStory) {
      setGeneratedStory(newGeneratedStory);
    }
    console.log('done generating >>>>', newGeneratedStory);
  };

  const preSaveStory = async () => {
    if (generatedStory === null) return;

    const storyObj = {
      prompt,
      dedication,
      title: generatedStory.title,
      summary: generatedStory.summary,
      background_color: randomiseBackgroundColor(),
      is_premium: false,
      is_published: false,
      is_ready: false,
      age_group_id: parseInt(age_group_id, 10),
      purpose_id: parseInt(purpose_id, 10),
    };

    if (session?.user.id) {
      await addStory(session.user.id, storyObj);
    }
    console.log('done saving >>>>');
  };

  const preSaveChapters = () => {
    if (generatedStory === null || !session?.user.id || !story?.id) return;

    const chaptersArray = Object.keys(generatedStory.chapters).map((key) => {
      const chapterNumber = parseInt(key.replace('chapter', ''), 10); // Extract the chapter number
      return {
        chapter_number: chapterNumber,
        content: (generatedStory.chapters as StoryChapters)[key],
        title: 'chapter_title',
        image_url: 'image_url',
      };
    });
    addChapters(session.user.id, story.id, chaptersArray);
    setIsGenerateed(true);
    console.log('done chapters >>>>');
  };

  useEffect(() => {
    // if the current step is story_generation, this mean we already have all the
    // necessary form state to perform a story generation
    if (step === 'story_generation') {
      if (!generatedStory) {
        console.log('starting generation');
        // story not yet generated
        requestStoryGeneration();
      } else if (!story?.id) {
        console.log('starting saving');
        console.log('gen story >>>', generatedStory);
        // story not yet on the DB
        preSaveStory();
      } else if (chapters.length === 0) {
        console.log('starting ssaving chapters');
        console.log('story >>>', story);
        // chapter not yet on the DB
        preSaveChapters();
      } else if (isGenerated) {
        console.log('chapters >>>', chapters);
        // we have all the conditions to advance to the next step
        router.replace('/creator/main-character');
      }
    }
  }, [step, generatedStory, story, chapters]);

  if (step === 'story_generation') {
    return (
      <View className="flex px-2 pt-6 h-full relative bg-purple">
        <View className="flex mb-6 flex-row justify-between " />
        <Book className="-rotate-8 mt-3">
          <View className="flex justify-center items-center gap-4">
            <Ionicons
              name={isGenerated ? 'checkmark-done-outline' : 'finger-print-outline'}
              color={isGenerated ? colors.blue : colors.black}
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
          nextStep={stepProps.nextStep}
        />
      </View>
      <View className="flex justify-end items-end bottom-4 absolute left-2">
        <CreatorNav step={step} isDisabled={!stepProps.value} />
      </View>
    </View>
  );
};

export default CreationStep;
