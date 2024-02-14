import { Ionicons } from '@expo/vector-icons';
import { getTokens } from '@tamagui/core';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export function AppHeaderLeft() {
  return (
    <Link href="/Search" asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="search-outline"
            size={28}
            color={getTokens().color.white.val}
            style={{ marginLeft: 32, marginTop: 16, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
}
