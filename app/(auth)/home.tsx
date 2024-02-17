import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

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
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
    </View>
  );
};

export default Home;
