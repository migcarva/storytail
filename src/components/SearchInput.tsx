import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, TextInput } from 'react-native';

const SearchInput: React.FC = () => {
  const [query, onQueryChange] = useState('');
  return (
    <View className="w-full mb-1.5">
      <View className="flex flex-row px-1 py-0.5 border border-black border-solid items-center rounded-full ">
        <Ionicons name="search-outline" size={24} />
        <TextInput
          onChangeText={onQueryChange}
          value={query}
          placeholder="useless placeholder"
          keyboardType="numeric"
          className="flex-1 px-0.5"
        />
        <Ionicons name="close-outline" size={32} />
      </View>
    </View>
  );
};

export default SearchInput;
