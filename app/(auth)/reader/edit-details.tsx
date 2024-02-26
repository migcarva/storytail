import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';

const EditDetails: React.FC = () => {
  return (
    <View className="flex flex-1 items-center bg-background pt-6 px-2">
      <Text className="text-1 font-body">Edit details</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default EditDetails;
