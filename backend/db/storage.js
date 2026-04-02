import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: "../../.env"  })

// Prefer a service_role key for server-side operations (bypass RLS for storage/uploads).
// If you don't have a service role key in your .env, set SUPABASE_SERVICE_ROLE_KEY.
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
//service key digunakan untuk menggantikan anon key, jika hanya menggunakan auth untuk
//anon, maka authorized akses akan ditolak, dasar database aneh.

//supabase url digunakan untuk mengakses database
//service key digunakan untuk mengakses storage dengan autentikasi bawaan supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  serviceKey
)

export default supabase