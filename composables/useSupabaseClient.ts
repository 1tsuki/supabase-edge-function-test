import { SupabaseClient, createClient } from "@supabase/supabase-js"

export const useSupabaseClient = <T>(): SupabaseClient<T> => {
  const { url, key } = useRuntimeConfig().public
  console.log(url, key)
  return createClient(url, key) as SupabaseClient<T>
}