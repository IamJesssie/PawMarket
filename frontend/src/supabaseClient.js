import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing! Check your .env file and restart your Vite server.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Bypass the buggy browser lock manager that causes infinite hangs and "stolen lock" errors.
    lock: async (...args) => {
      console.log('Supabase lock arguments:', args);
      // Supabase passes (name, acquire) or (name, acquireTimeout, fn)? We can just find the function
      const fn = args.find(arg => typeof arg === 'function');
      if (fn) {
        return await fn();
      }
      return null;
    }
  }
});
