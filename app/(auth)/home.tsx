import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text } from 'react-native';

const Home = () => {
  const { user } = useUser();

  // const modalOptions: NativeStackNavigationOptions = {
  //   presentation: 'modal',
  //   headerTransparent: true,
  //   headerTitleStyle: {
  //     fontFamily: 'BellotaText_700Bold',
  //     fontSize: 20,
  //   },
  // };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Welcome, {user?.firstName} {user?.lastName} 🎉
      </Text>
    </View>
  );
};

export default Home;
