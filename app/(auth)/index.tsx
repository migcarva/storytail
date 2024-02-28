import { Text, View } from 'react-native';

import SignInForm from '@/src/components/auth/SignInForm';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-blue px-4 pt-10">
      <View className="flex gap-y-1 pb-6">
        <View className="flex gap-y-0.25">
          <Text className="text-3 font-headingbold tracking-widest leading-none text-purple">
            Imagine
          </Text>
          <Text className="text-3 font-headingbold tracking-widest leading-none text-purple">
            Create
          </Text>
          <Text className="text-3 font-headingbold tracking-widest leading-none text-purple">
            Discover
          </Text>
        </View>
        <Text className="text-2 font-body text-purple w-[60vw]">
          Unleash <Text className="font-bodybold underline">Your</Text> Story with{' '}
          <Text className="font-bodybold underline">Storytail</Text>
        </Text>
      </View>

      <View className="flex flex-1">
        <SignInForm />
      </View>
    </View>
  );
}
