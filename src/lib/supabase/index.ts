import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

import { SecureStoreAdapter } from '@/src/lib/supabase/secureStoreAdapter';

const config = Constants.expoConfig!.extra!;
const env = process.env;

const supabaseUrl = config.EXPO_PUBLIC_SUPABASE_PROJECT_URL || env.EXPO_PUBLIC_SUPABASE_PROJECT_URL;
const supabaseAnonKey = config.EXPO_PUBLIC_SUPABASE_KEY || env.EXPO_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: SecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
