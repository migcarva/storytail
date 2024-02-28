import { Text, View } from 'react-native';

import SignUpForm from '@/src/components/auth/SignUpForm';

export default function SignupScreen() {
  return (
    <View className="flex-1 bg-yellow px-4 pt-10">
      <View className="flex gap-y-1 pb-4">
        <View className="flex gap-y-0.25 pb-0.25">
          <Text className="text-3 font-headingbold tracking-widest leading-none text-purple">
            Sign up
          </Text>
        </View>
        <Text className="text-2 font-body text-purple w-[70vw]">
          Craft magical tales for the little dreamers in your life
        </Text>
      </View>

      <View className="flex flex-1">
        <SignUpForm />
      </View>
    </View>
  );
}
