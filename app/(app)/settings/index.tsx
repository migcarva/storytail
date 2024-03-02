import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import SignoutButton from '@/src/components/navs/SignoutButton';
import { useAuthStore } from '@/src/services/auth';
import { useGetProfile } from '@/src/services/profile';
import colors from '@/src/utils/colors';

const settingsList = [
  {
    slug: 'manage-storytail',
    groupName: 'Manage Storytail',
    items: [
      {
        path: 'profile',
        title: 'Manage your profile',
        iconName: 'person-circle-outline',
      },
      {
        path: 'subscription',
        title: 'Manage your subscription',
        iconName: 'card-outline',
      },
      // {
      //   path: 'story-settings',
      //   title: 'Story Settings',
      //   iconName: 'construct-outline',
      // },
    ],
  },
  {
    slug: 'more-options',
    groupName: 'More options',
    items: [
      {
        path: 'support',
        title: 'Support and feedback',
        iconName: 'chatbubble-ellipses-outline', // option: bug-outline
      },
      {
        path: 'gifting',
        title: 'Gifting Storytail',
        iconName: 'gift-outline', // option: diamond-outline
      },
      {
        path: 'how-to-use',
        title: 'How to use Storytail',
        iconName: 'bulb-outline',
      },
    ],
  },
];

const Settings: React.FC = () => {
  const { user } = useAuthStore();
  const { data: profile, status, error } = useGetProfile({ userId: user!.id });

  if (status === 'pending') {
    return (
      <View className="flex flex-1 px-2 pt-6 bg-background">
        <Spinner
          textContent="Loading..."
          textStyle={{
            color: colors.black,
          }}
        />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View className="flex flex-1 px-2 pt-6 bg-background">
        <Text className="text-2 text-black font-heading">Error loading profiel</Text>
        <Text className="text-1.25 text-black font-heading">{error.message}</Text>
      </View>
    );
  }

  const displayName = profile!.full_name || profile!.username || 'adventurer!';

  return (
    <View className="flex flex-1 px-2 pt-6 bg-background gap-y-2">
      <View className="flex flex-row justify-between items-center pb-4">
        <Text className="text-1.5 text-black font-bodylight">Hi, {displayName}</Text>
      </View>

      <View className="flex">
        {settingsList.map(({ groupName, items, slug }) => (
          <View className="flex pb-2" key={slug}>
            <Text className="font-bodylight text-1 pb-1">{groupName}</Text>
            <View className="flex gap-1">
              {items.map((item) => (
                <SettingsListItem
                  key={item.path}
                  path={item.path}
                  iconName={item.iconName}
                  title={item.title}
                />
              ))}
            </View>
          </View>
        ))}
      </View>

      <View className="absolute bottom-4 w-full pl-4">
        <SignoutButton />
      </View>
    </View>
  );
};

export default Settings;

const SettingsListItem: React.FC<{
  path: string;
  iconName: string; // Using string for broad compatibility
  title: string;
}> = ({ path, iconName, title }) => {
  return (
    <Link href={`/settings/${path}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View className="flex flex-row justify-between items-center">
            <View
              className="flex flex-row items-center gap-1"
              style={{ opacity: pressed ? 0.5 : 1 }}>
              <Ionicons
                name={iconName as any} // Cast to `any` to bypass the type checking issue
                size={24}
                color={colors.black}
              />
              <Text className="font-body text-1.5">{title}</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline" // Cast to `any` to bypass the type checking issue
              size={24}
              color={colors.black}
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
};
