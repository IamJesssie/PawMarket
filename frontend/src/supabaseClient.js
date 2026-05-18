import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing! Check your .env file and restart your Vite server.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Bypass the buggy browser lock manager that causes infinite hangs and "stolen lock" errors.
    // This guarantees the UI will never get stuck on "Logging In..." or "Loading profile..."
    lock: async (name, acquireTimeout, fn) => {
      return await fn();
    }
  }
});
