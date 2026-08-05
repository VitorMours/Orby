import { supabase } from "@/config/supabase";
import AuthRepository from "@/repositories/auth.repository";


class AuthService {
    static repository: any;

    public AuthService(authRepository: AuthRepository) {
        AuthService.repository = authRepository;
    }


    static async signup() {}


    static async login(email: string, password: string) {
        await AuthService.repository.login(email, password);
    }

    static async logout() {}


    static async validate() {}

} 


export default AuthService;