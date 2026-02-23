import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path:"../../.env" })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default supabase