import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import useIsOnlinePages from '@/src/hooks/useIsOnlinePages';

const NotificationsAndSettings: React.FC = () => {
  const isOnline = useIsOnlinePages();

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
              className={`${isOnline ? 'text-black' : 'text-white'}`}
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
              className={`${isOnline ? 'text-black' : 'text-white'}`}
              style={{ marginLeft: 16, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  );
};

export default NotificationsAndSettings;
