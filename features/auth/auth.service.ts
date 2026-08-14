import { supabase } from "@/config/supabase";
import { Login, Register } from "./auth.schema";
import UserService from "../users/user.service";
import { User } from "@supabase/supabase-js";

/**
 * Classe de serviço responsável pela abstração de autenticação e autorização do 
 * usuário, toda essa parte é feita comunicando-se com o Supabase, e deve ser 
 * feita exclusivamente pelo server-side, tendo em vista o tipo de autenticação
 * que está sendo usada no app.
 * 
 * @author João Vítor R. Moura
 * @since 13/08/2026
 */
class AuthService {

    /**
     * Registra um novo usuário na autenticação do Supabase
     * e cria seu perfil na aplicação.
     *
     * @since 13/08/2026
     *
     * @param body - Dados utilizados para criar a conta e o perfil do usuário.
     * @returns Dados do perfil criado.
     * @throws {Error} Quando ocorre uma falha durante o registro.
     */
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

    /**
     * Método de login do usuário por meio do seu email e senha
     * @since 13/08/2026
     * 
     * @param {Login} body - Dados necessários para autenticação.
     * @returns Dados do usuário e da sessão criada.
     * @throws {Error} Quando ocorre um erro durante a autenticação.
     *
     * @example
     * ```ts
     * const result = await AuthService.login({
     *     email: "usuario@email.com",
     *     password: "123456"
     * });
     * ```
     */
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

    /**
     * Método de login do usuário por meio do seu email e senha
     * @since 13/08/2026
     * 
     * @returns Faz logout do usuário no sistema.
     * @throws {Error} Quando o usuário não existe ou ocorre erro de autenticação.
     *
     */
    public static async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Metodo de validação das credenciais do usuario, verificando se ele
     * estar logado dentro do sistema, ou não.
     * @since 13/08/2026
     * 
     * @returns A sessão do usuário caso seja existente, ou nulo se não for existente.
     * @throws {Error} Quando persiste algum erro de autenticação e/ou autorização dentro do banco de dados
     */
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
}

export default AuthService;