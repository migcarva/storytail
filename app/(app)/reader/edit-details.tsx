import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

import { isIphone } from '@/src/utils';

const EditDetails: React.FC = () => {
  return (
    <View className="flex flex-1 items-center bg-background pt-6 px-2">
      <Text className="text-1 font-body">Edit details</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={isIphone ? 'light' : 'auto'} />
    </View>
  );
};

export default EditDetails;
