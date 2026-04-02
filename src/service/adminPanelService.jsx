import { supabase } from "../lib/supabaseClient"

export async function fetchProducts() {
  const { data: userData } = await supabase.auth.getUser()

  const user = userData.user 

  if(!user) return
  const { data, error } = await supabase
    .from("items")
    .select("*", "admind!admins_id(id)")
    .eq("admins_id", user.id)

  if (error) throw error
  return data
}

export async function nukeProduct() {
  const { error } = await supabase.rpc("truncate_items")

  if (error) throw error
}
