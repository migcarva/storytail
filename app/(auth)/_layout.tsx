import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';
import React from 'react';

import colors from '@/src/utils/colors';

const PublicLayout: React.FC = () => {
  const options: NativeStackNavigationOptions = {
    headerTitle: '',
    headerTransparent: true,
    headerTintColor: colors.purple,
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#513175',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          ...options,
          headerStyle: {
            backgroundColor: colors.yellow,
          },
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          ...options,
          headerStyle: {
            backgroundColor: colors.orange,
          },
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
