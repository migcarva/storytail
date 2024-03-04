import type {
  User as SupabaseUser,
  Session as SupabaseSession,
  AuthError as SupabaseAuthError,
} from '@supabase/supabase-js';

export type User = SupabaseUser;
export type Session = SupabaseSession;
export type AuthError = SupabaseAuthError;
