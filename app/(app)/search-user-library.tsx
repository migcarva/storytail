import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import FilteredBookList from '@/src/components/FilteredBookList';
import SearchInput from '@/src/components/SearchInput';
import { isIphone } from '@/src/utils';

const SearchUserLibrary: React.FC = () => {
  return (
    <View className="flex flex-1 items-center bg-background pt-6 px-2">
      <SearchInput />
      <FilteredBookList />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={isIphone ? 'light' : 'auto'} />
    </View>
  );
};

export default SearchUserLibrary;
