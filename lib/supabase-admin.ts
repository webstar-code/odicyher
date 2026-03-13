import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client with service role key for admin operations.
 * Bypasses RLS - use only in server-side API routes or server actions.
 */
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export { getSupabaseAdmin };
