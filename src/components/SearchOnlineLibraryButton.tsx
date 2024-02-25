import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

const SearchOnlineLibraryButton: React.FC = () => {
  return (
    <Link href="/search-online-library" asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="search-outline"
            size={28}
            className="text-black"
            style={{ marginLeft: 32, marginTop: 16, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

export default SearchOnlineLibraryButton;
