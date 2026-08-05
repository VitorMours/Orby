import { supabase } from "@/config/supabase";

type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export async function insertUser(user: User) {
  return supabase.from("users").insert(user).select();
}