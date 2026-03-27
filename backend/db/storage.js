import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: "../../.env"  })

// Prefer a service_role key for server-side operations (bypass RLS for storage/uploads).
// If you don't have a service role key in your .env, set SUPABASE_SERVICE_ROLE_KEY.
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  serviceKey
)

export default supabase