import { createClient } from '@supabase/supabase-js';

// These would come from environment variables in production
// For now, we'll use mock data until Supabase is set up
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if credentials exist
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function isSupabaseConfigured(): boolean {
  return !!supabase;
}