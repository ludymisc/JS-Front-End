import { supabase } from "../lib/supabaseClient"

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("items")
    .select("*")

  if (error) throw error
  return data
}

export async function nukeProduct() {
  const { error } = await supabase.rpc("truncate_items")

  if (error) throw error
}
