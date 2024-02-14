import { getTokens } from '@tamagui/core';
import { Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { TabBarIcon } from '@/components/TabBarIcon';
import { AppHeaderLeft } from '@/components/AppHeaderLeft';
import { AppHeaderRight } from '@/components/AppHeaderRight';

export default function TabLayout() {
  const screenOptions = {
    // Disable the static render of the header on web
    // to prevent a hydration error in React Navigation v6.
    headerShown: useClientOnlyValue(false, true),
    headerTransparent: true,
    headerShadowVisible: false, // removes the "border" on the header
    headerTitle: '',
    tabBarStyle: {
      backgroundColor: getTokens().color.accent.val,
      borderBlockColor: 'transparent',
    },
    tabBarShowLabel: false,
    tabBarActiveTintColor: getTokens().color.white.val,
    tabBarInactiveTintColor: getTokens().color.lightgrey.val,
  };
return (
  <Tabs screenOptions={screenOptions}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Your library',
        tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        headerLeft: () => <AppHeaderLeft />,
        headerRight: () => <AppHeaderRight />,
      }}
    />
    <Tabs.Screen
      name="online-library"
      options={{
        title: 'Online Library',
        tabBarIcon: ({ color }) => <TabBarIcon name="globe-outline" color={color} />,
        headerLeft: () => <AppHeaderLeft />,
        headerRight: () => <AppHeaderRight />,
      }}
    />
  </Tabs>
);
}
