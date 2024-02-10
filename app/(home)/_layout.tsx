import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { View } from '@/components/Themed';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons style={{ marginBottom: -3 }} size={28} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
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
                    name="search"
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginLeft: 16, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <View style={{display: 'flex', flexDirection: "row", marginRight: 16}}>
              <Link href="/notifications" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="notifications"
                      size={24}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/settings" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="menu"
                      size={24}
                      color={Colors[colorScheme ?? 'light'].text}
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
        name="two"
        options={{
          title: 'Online Library',
          tabBarIcon: ({ color }) => <TabBarIcon name="globe-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
