import { CreateUser } from "@/features/users/user.schema";
import { createSupabaseServer } from "@/config/supabase";

export default class UserService {
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
}