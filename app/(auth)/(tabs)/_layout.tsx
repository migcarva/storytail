import { Tabs } from 'expo-router';

import NotificationsAndSettings from '@/src/components/NotificationsAndSettings';
import SearchOnlineLibraryButton from '@/src/components/SearchOnlineLibraryButton';
import SearchUserLibraryButton from '@/src/components/SearchUserLibraryButton';
import TabBarIcon from '@/src/components/TabBarIcon';
import { useClientOnlyValue } from '@/src/hooks/useClientOnlyValue';
import useIsOnlinePages from '@/src/hooks/useIsOnlinePages';
import colors from '@/src/utils/colors';

const TabsPage: React.FC = () => {
  // const { isSignedIn } = useAuth();
  const isSignedIn = true;
  const isOnline = useIsOnlinePages();

  const tabBarBg = isOnline ? colors.background : colors.purple;
  const activeTabTint = isOnline ? colors.background : colors.white;
  const inactiveTabTin = isOnline ? colors.background : colors.white;

  const options = {
    // Disable the static render of the header on web
    // to prevent a hydration error in React Navigation v6.
    headerShown: useClientOnlyValue(false, true),
    headerTransparent: true,
    headerShadowVisible: false, // removes the "border" on the header
    headerTitle: '',
    tabBarStyle: {
      backgroundColor: tabBarBg,
      borderBlockColor: 'transparent',
    },
    tabBarShowLabel: false,
    tabBarActiveTintColor: activeTabTint,
    tabBarInactiveTintColor: inactiveTabTin,
  };

  const bookIconName = isOnline ? 'book-outline' : 'book';
  const earthIconName = isOnline ? 'earth' : 'earth-outline';

  return (
    <Tabs screenOptions={options}>
      <Tabs.Screen
        name="user-library"
        options={{
          title: 'Your library',
          tabBarIcon: ({ color }) => <TabBarIcon name={bookIconName} color={color} />,
          headerLeft: () => <SearchUserLibraryButton />,
          headerRight: () => <NotificationsAndSettings />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="online-library"
        options={{
          title: 'Online Library',
          tabBarIcon: ({ color }) => <TabBarIcon name={earthIconName} color={color} />,
          headerLeft: () => <SearchOnlineLibraryButton />,
          headerRight: () => <NotificationsAndSettings />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
