import { Text, View } from 'react-native';

import ResetPasswordForm from '@/src/components/auth/ResetPasswordForm';

export default function ResetPassScreen() {
  return (
    <View className="flex-1 bg-orange px-4 pt-10">
      <View className="flex gap-y-1 pb-4">
        <View className="flex gap-y-0.25 pb-0.25">
          <Text className="text-3 font-headingbold tracking-widest leading-none text-purple">
            Oops!
          </Text>
        </View>
        <Text className="text-2 font-body text-purple w-[70vw]">
          Forgot Your Storyline? Let's Plot a New Password!
        </Text>
      </View>

      <View className="flex flex-1">
        <ResetPasswordForm />
      </View>
    </View>
  );
}
