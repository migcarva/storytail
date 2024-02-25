import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import colors from '@/src/utils/colors';

const SearchUserLibrary: React.FC = () => {
  return (
    <Link href="/search-user-library" asChild>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="search-outline"
            size={28}
            color={colors.white}
            style={{ marginLeft: 32, marginTop: 16, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
};

export default SearchUserLibrary;
