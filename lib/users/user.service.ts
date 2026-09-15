import { CreateUser } from "@/lib/users/user.schema";
import { createSupabaseServer } from "@/lib/supabase";

export default class UserService {
  public static async getUserById(userId: string) {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.from("users").select("").eq("id", userId).single();

    if(error){
      throw new Error(error.message);
    }
    return data;
  }

  public static async createUser(body: CreateUser) {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.from("users").insert({
      firstName : body.firstName,
      lastName : body.lastName,
      email : body.email
    }).select();

    if(error) {
      throw new Error(error.message);
    }
    return data[0];
  }

  public static async updateUserById(userId: string, body: Partial<CreateUser>) {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("users")
      .update(body)
      .eq("id", userId)
      .select()
      .single();

    if(error) {
      throw new Error(error.message);
    }
    
    return data;
  }
}