import { useAuth } from '@clerk/clerk-expo';
import { getTokens } from '@tamagui/core';
import { Tabs } from 'expo-router';

import NotificationsAndSettings from '@/components/NotificationsAndSettings';
import SearchUserLibrary from '@/components/SearchUserLibrary';
import TabBarIcon from '@/components/TabBarIcon';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

const TabsPage: React.FC = () => {
  const { isSignedIn } = useAuth();

  const options = {
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
    <Tabs screenOptions={options}>
      <Tabs.Screen
        name="user-library"
        options={{
          title: 'Your library',
          tabBarIcon: ({ color }) => <TabBarIcon name="book-outline" color={color} />,
          headerLeft: () => <SearchUserLibrary />,
          headerRight: () => <NotificationsAndSettings />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="online-library"
        options={{
          title: 'Online Library',
          tabBarIcon: ({ color }) => <TabBarIcon name="earth-outline" color={color} />,
          headerRight: () => <NotificationsAndSettings />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
