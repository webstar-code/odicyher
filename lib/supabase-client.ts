import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // We deliberately don't throw here to keep builds working in environments
  // where Supabase isn't configured yet. Call sites can handle a null client.
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase-client] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Supabase client will be unavailable.",
  );
}

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

