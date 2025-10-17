import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceKey) {
  // This file is server-only; failing fast if the service key is missing helps debugging.
  // In Next.js this module should only be imported from server code (API routes / server components).
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in the environment. Set it in .env.local and restart the server.')
}

// Cliente Supabase para operações do servidor (service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
