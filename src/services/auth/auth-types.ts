import type {
  AuthSession as SupabaseAuthSession,
  AuthUser as SupabaseAuthUser,
} from '@supabase/supabase-js';

export type AuthUser = SupabaseAuthUser;
export type AuthSession = SupabaseAuthSession;
