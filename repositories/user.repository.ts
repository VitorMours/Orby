import { supabase } from "@/config/supabase";
import { User } from "@/schemas/user";

export async function insertUser(user: User) {
  return supabase.from("users").insert(user);
}