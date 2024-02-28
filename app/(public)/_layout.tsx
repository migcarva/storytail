import { Stack } from 'expo-router';
import React from 'react';

const PublicLayout: React.FC = () => {
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
        name="signin"
        options={{
          headerTitle: 'Sign In',
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
