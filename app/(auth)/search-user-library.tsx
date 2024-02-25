import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, View } from 'react-native';

import FilteredBookList from '@/src/components/FilteredBookList';
import SearchInput from '@/src/components/SearchInput';

const SearchUserLibrary: React.FC = () => {
  return (
    <View className="flex flex-1 items-center bg-background pt-6 px-2">
      <SearchInput />
      <FilteredBookList />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default SearchUserLibrary;
