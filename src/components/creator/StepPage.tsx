import Ionicons from '@expo/vector-icons/Ionicons';
import { Dispatch, SetStateAction } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { Book } from '@/src/components/creator/CreatorBook';
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

const StepPage: React.FC<StepProps<string, keyof OptionTypes>> = ({
  type,
  value,
  setter,
  question,
  options,
}) => {
  return (
    <Book className="-rotate-8 mt-3">
      <Text className="text-2 font-headinglight w-[256px] text-center text-grey pb-2">
        {question}
      </Text>
      <View className="flex">
        {type === 'input' && (
          <TextInput
            onChangeText={(v: string) => setter(v)}
            keyboardType="default"
            placeholder={options && ('placeholder' in options ? options.placeholder : '')}
            value={value}
            autoFocus
            className="border-b-2 border-solid border-lightgrey text-center p-1 text-2 font-headingbold w-[256px]"
          />
        )}
        {type === 'select' &&
          options &&
          Array.isArray(options) &&
          options.map((o: SelectOption) => (
            <Pressable key={o.value} onTouchEnd={() => setter(o.value)}>
              <View className="flex flex-row justify-center items-center">
                <Text
                  className={`${o.value === value ? 'text-2' : 'text-1.5 text-black'} font-headingbold text-center pb-0.5`}>
                  {o.text}
                </Text>
                {o.value === value && (
                  <Ionicons
                    name="checkmark-outline"
                    color={colors.purple}
                    size={24}
                    className="absolute -right-2"
                  />
                )}
              </View>
            </Pressable>
          ))}
      </View>
    </Book>
  );
};

export default StepPage;
