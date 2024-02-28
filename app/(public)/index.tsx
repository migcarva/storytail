import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex flex-1 bg-background p-4"
      // HACK: This is a workaround for the SafeAreaView className prop not working
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <View className="flex flex-1 items-center justify-center gap-y-4">
        <Text className="text-3 font-headingbold tracking-tight text-center">
          Welcome to Storytail
        </Text>
        <Text className="text-2 font-body text-center">Where your imagination becames reality</Text>
      </View>
      <View className="flex flex-row gap-x-4 justify-center bottom-2">
        <Link href="/signup" asChild>
          <Pressable>
            {({ pressed }) => <Text className="text-2 font-headingbold text-black">Sign up</Text>}
          </Pressable>
        </Link>
        <Link href="/signin" asChild>
          <Pressable>
            {({ pressed }) => <Text className="text-2 font-headingbold text-black">Sign in</Text>}
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
