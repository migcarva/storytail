import { Ionicons } from '@expo/vector-icons';
import { getTokens } from '@tamagui/core';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import useIsOnlinePages from '@/src/hooks/useIsOnlinePages';

const NotificationsAndSettings: React.FC = () => {
  const inOnline = useIsOnlinePages();
  const iconColor = inOnline ? getTokens().color.black.val : getTokens().color.white.val;

  return (
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
              size={28}
              color={iconColor}
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
              size={28}
              color={iconColor}
              style={{ marginLeft: 16, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  );
};

export default NotificationsAndSettings;
