import React from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { getTokens } from '@tamagui/core';

export function AppHeaderRight() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginRight: 32,
        backgroundColor: 'transparent',
        marginTop: 16,
      }}>
      <Link href="/Notifications" asChild>
        <Pressable>
          {({ pressed }) => (
            <Ionicons
              name="notifications-outline"
              size={28}
              color={getTokens().color.white.val}
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
      <Link href="/Settings" asChild>
        <Pressable>
          {({ pressed }) => (
            <Ionicons
              name="menu-outline"
              size={28}
              color={getTokens().color.white.val}
              style={{ marginLeft: 16, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  );
}
