import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Text, View, Input } from 'tamagui';

const SearchUserLibrary: React.FC = () => {
  return (
    <View
      f={1}
      alignItems="center"
      backgroundColor="$background"
      paddingVertical="$6"
      paddingHorizontal="$2">
      <SearchInput />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default SearchUserLibrary;

const SearchInput: React.FC = () => {
  return (
    <View
      alignItems="center"
      justifyContent="center"
      paddingHorizontal="$4"
      marginTop="$2"
      display="flex"
      flexDirection="row"
      borderColor="$lightgrey"
      borderRadius="$4"
      width="100%">
      <Ionicons name="search-outline" size={24} />
      <Input
        size="$3"
        placeholder="Search..."
        placeholderTextColor="$black"
        padding="$2"
        borderColor="transparent"
        color="$black"
        width="90%"
      />
      <Ionicons name="close-outline" size={32} />
    </View>
  );
};
