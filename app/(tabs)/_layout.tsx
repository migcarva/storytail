import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { getTokens } from '@tamagui/core';

import { View } from '@/components/Themed';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons style={{ marginBottom: -3 }} size={28} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: getTokens().color.white.val,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTransparent: true,
        headerShadowVisible: false, // removes the "border" on the header
        tabBarStyle: {
          backgroundColor: getTokens().color.accent.val,
          borderBlockColor: 'transparent',
        },
        tabBarShowLabel: false,
        headerTitle: '',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Your library',
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
          headerLeft: () => (
            <Link href="/search" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="search-outline"
                    size={32}
                    color={getTokens().color.white.val}
                    style={{ marginLeft: 32, marginTop: 16, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 32,
                backgroundColor: 'transparent',
                marginTop: 16,
              }}>
              <Link href="/notifications" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="notifications-outline"
                      size={32}
                      color={getTokens().color.white.val}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/settings" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="menu-outline"
                      size={32}
                      color={getTokens().color.white.val}
                      style={{ marginLeft: 16, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="online-library"
        options={{
          title: 'Online Library',
          tabBarIcon: ({ color }) => <TabBarIcon name="globe-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
