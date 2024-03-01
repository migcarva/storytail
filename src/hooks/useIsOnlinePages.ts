import { useSegments } from 'expo-router';

export const useIsOnlinePages = () => {
  const segments = useSegments();
  const inOnlineLibrary = segments.includes('online-library');
  const inSearchOnlineLibrary = segments.includes('search-online-library');

  return inOnlineLibrary || inSearchOnlineLibrary;
};
