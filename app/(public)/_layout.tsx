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
          headerTitle: 'Storytail Sign In',
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: 'Storytail Sign Up',
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: 'Storytail Reset Password',
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
