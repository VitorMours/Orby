import { supabase } from "@/config/supabase";
import { Login, Register } from "./auth.schema";
import UserService from "../users/user.service";
import { User } from "@supabase/supabase-js";

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

    public static async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw new Error(error.message);
        }
    }

    public static async validate(): Promise<User | null> {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (error) {
            throw new Error(error.message);
        }

        return session?.user ?? null;
    }

    public static onAuthStateChange(
        callback: (user: User | null) => void
    ) {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                callback(session?.user ?? null);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }
}

export default AuthService;