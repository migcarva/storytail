import { useSegments } from 'expo-router';

const useIsOnlinePages = () => {
  const segments = useSegments();
  const inOnlineLibrary = segments.includes('online-library');
  const inSearchOnlineLibrary = segments.includes('search-online-library');

  return inOnlineLibrary || inSearchOnlineLibrary;
};

export default useIsOnlinePages;
