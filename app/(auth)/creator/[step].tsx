import { useLocalSearchParams } from 'expo-router';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import CreatorNav, { CloseButton } from '@/src/components/creator/CreatorNav';

type StepProps = {
  value: string | undefined;
  cb: Dispatch<SetStateAction<string>> | undefined;
};

const CreationStep: React.FC = () => {
  const { step } = useLocalSearchParams();
  const [to, setTo] = useState('');

  const stepNumber = Number(step);
  let stepProps: StepProps = {
    value: undefined,
    cb: undefined,
  };

  switch (stepNumber) {
    case 1:
      stepProps = {
        value: to,
        cb: setTo,
      };
      break;
  }

  if (stepProps.value === undefined || stepProps.cb === undefined) return null;

  return (
    <View className="flex h-full relative bg-purple px-2 pt-6">
      <CloseButton />
      <View className="flex flex-row">
        <StepPage step={stepNumber} props={stepProps} />
      </View>
      <View className="flex justify-end items-end bottom-4 absolute left-2">
        {/* -1 because is the intro page. chapter 0 is the first entry */}
        <CreatorNav step={stepNumber} />
      </View>
    </View>
  );
};

export default CreationStep;

const StepPage: React.FC<{
  step: number;
  props: StepProps;
}> = ({ step, props }) => {
  let question;
  switch (step) {
    case 1:
      question = 'This story is dedicated to';
      break;
  }
  return (
    <Book className="-rotate-8 mt-3">
      <View className="bg-white h-[512px] pt-10 flex items-center rounded-tr-0.5 rounded-br-0.5">
        <Text className="text-2 font-headinglight w-[256px] text-center text-grey pb-1">
          {question}
        </Text>
        <View className="flex">
          <TextInput
            onChangeText={(v: string) => props.cb!(v)}
            keyboardType="default"
            placeholder="your kid's name"
            value={props.value}
            className="border-b border-solid border-black text-center p-1 text-2 font-headingbold w-[256px]"
          />
        </View>
      </View>
    </Book>
  );
};

const Book: React.FC<{ children: ReactNode; className: string }> = ({ children, className }) => {
  return (
    <View className={`relative ${className}`}>
      <BookShadows />
      <View className="bg-white w-[336px] h-[512px] flex items-center rounded-tr-0.5 rounded-br-0.5 right-0.5">
        {children}
      </View>
    </View>
  );
};

const BookShadows: React.FC = () => {
  return (
    <>
      {/* right rounded shadows */}
      <View className="absolute bg-page4 w-[336px] h-[512px] rounded-tr-0.5 rounded-br-0.5 z-0" />
      <View className="absolute bg-page3 w-[336px] h-[512px] rounded-tr-0.5 rounded-br-0.5 z-0 right-0.125" />
      <View className="absolute bg-page2 w-[336px] h-[512px] rounded-tr-0.5 rounded-br-0.5 z-0 right-0.25" />
      <View className="absolute bg-page1 w-[336px] h-[512px] rounded-tr-0.5 rounded-br-0.5 z-0 right-0.375" />
      {/* right middle shadows */}
      <View className="absolute bg-page0 w-[32px] h-[512px] -left-0 z-10" />
      <View className="absolute bg-page1 w-[16px] h-[512px] -left-0 z-10" />
      <View className="absolute bg-page2 w-[8px] h-[512px] -left-0 z-10" />
      <View className="absolute bg-page3 w-[4px] h-[512px] -left-0 z-10" />
      <View className="absolute bg-page4 w-[2px] h-[512px] -left-0 z-10" />
      {/* right rounded shadows */}
      <View className="absolute bg-white w-[336px] h-[512px] -translate-x-[336px] z-0" />
      {/* left middle shadows */}
      <View className="absolute bg-page0 w-[32px] h-[512px] -translate-x-[28px] z-10" />
      <View className="absolute bg-page1 w-[16px] h-[512px] -translate-x-[12px] z-10" />
      <View className="absolute bg-page2 w-[8px] h-[512px] -translate-x-[6px] z-10" />
      <View className="absolute bg-page3 w-[4px] h-[512px] -translate-x-[2px] z-10" />
      <View className="absolute bg-page4 w-[2px] h-[512px] -translate-x-0 z-10" />
    </>
  );
};
