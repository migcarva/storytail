import { useContext } from 'react';

import { SupabaseContext } from '@/src/context/SupabaseContext';

export const useSupabase = () => useContext(SupabaseContext);
