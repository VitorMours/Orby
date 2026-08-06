import { supabase } from "@/config/supabase";
import { Login, Register } from "@/schemas/auth.schema";
import UserService from "./user.service";

class AuthService {

    public static async register(body: Register) {
        const { data, error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password
        });
        if(error) {
            throw new Error(error.message);
        }
        const response = await UserService.createUser(body);
        return response;
    }

    public static async login(body: Login) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password
        });

        if(error) {
            throw new Error(error.message);
        }

        if (!data.session || !data.user) {
            throw new Error("Falha ao criar sessão de autenticação.");
        }
        return data;
    }

    public static async logout() {}

    public static async validate() {}
}

export default AuthService;