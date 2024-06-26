import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

import { SecureStoreAdapter } from '@/src/lib/supabase/secureStoreAdapter';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLIC_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: SecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
  },
});
