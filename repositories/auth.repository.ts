import { supabase } from "@/config/supabase";

class AuthRepository {

    static async signup() {}

    static async login(email: string, password: string) {
        await supabase.auth.signInWithPassword({ email, password });
    }

}

export default AuthRepository;