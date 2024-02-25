import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, TextInput, View } from 'react-native';

const SearchUserLibrary: React.FC = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-background">
      <SearchInput />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default SearchUserLibrary;

const SearchInput: React.FC = () => {
  const [number, onChangeNumber] = useState('');
  return (
    <View>
      <Ionicons name="search-outline" size={24} />
      <TextInput
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Ionicons name="close-outline" size={32} />
    </View>
  );
};
