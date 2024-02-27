import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { Book } from '@/src/components/creator/CreatorBook';
import CreatorNav, { CloseButton } from '@/src/components/creator/CreatorNav';
import StepPage from '@/src/components/creator/StepPage';
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
  const { step } = useLocalSearchParams();
  const [to, setTo] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [prompt, setPrompt] = useState('');
  const [purpose, setPurpose] = useState('surprise');

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
          question: "what's the target age group?",
          options: [
            { value: '1-4', text: '1-4 years old' },
            { value: '5-8', text: '5-8 years old' },
            { value: '9-12', text: '9-12 years old' },
          ],
        };
        break;
      case 3:
        stepProps = {
          value: prompt,
          setter: setPrompt,
          type: 'input',
          question: "what's this story about?",
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
          question: "what's the purpose of the story?",
          options: [
            { value: 'surprise', text: 'surprise me' },
            { value: 'creativity', text: 'inspire criativity' },
            { value: 'empathy', text: 'foster empathy' },
            { value: 'curiosity', text: 'stimulate curiosity' },
            { value: 'lesson', text: 'teach a lesson' },
            { value: 'confidence', text: 'boost confidence' },
          ],
        };
        break;
    }

    return stepProps!;
  };

  const stepNumber = Number(step);
  const stepProps = getStepProps(stepNumber);

  useEffect(() => {
    if (stepNumber === 5) {
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
