import { z } from "zod";

/**
 * @since 14/08/2026
 * Schema de validação para credenciais de Login no processo de autenticação
 * 
 * Valida:
 * - `email`: Verifica se o email é uma string válida;
 * - `password`: Verifica se a senha é uma string válida;
 * 
 * @example 
 * ```ts
 * const result = LoginSchema.safeParse({
 *     email: "usuario@email.com",
 *     password: "123456",
 * });
 *
 * if (!result.success) {
 *     console.error(result.error);
 * }
 * ```
 */
export const LoginSchema = z.object({
    email: z.email("email is required"),
    password: z.string("password is required").min(6, "password must have at least 6 characters")
});

/**
 * @since 14/08/2026
 * Schema de validação para credenciais de Register no fluxo de criação de usuário
 * 
 * Valida:
 * - `firstName`: Verifica se o é uma string válida de no máximo 100 caracteres;
 * - `lastName`: Verifica se o é uma string válida de no máximo 100 caracteres;
 * - `email`: Verifica se o email é uma string válida;
 * - `password`: Verifica se a senha é uma string válida, e possui no mínimo 6 e no máximo 100 caracteres;
 */
export const RegisterSchema = z.object({
    firstName: z.string("first name is required").trim().min(3, "first name is required").max(100),
    lastName: z.string("last name is required").trim().min(3, "last name is required").max(100),
    email: z.email("email is required"),
    password: z.string("password is required").min(6).max(100)
});

/**
 * @since 14/08/2026
 * Schema de validação para credenciais de Session no fluxo de verificação de autenticação
 * Valida:
 * - `access_token`: Verifica o token de acesso da aplicação
 * - `token_type`: Verifica o tipo do token, que é 'bearer'
 * - `expires_in`: Verifica o tempo em que o token vai expirar
 * - `expires_at`: Representa o tempo exato de expiração com unixtimestamp
 * - `refresh_token`: Verifica o token de atualização do token de acesso
 */
export const SessionSchema = z.object({
    access_token: z.string().min(1),
    refresh_token: z.string().min(1),
    expires_at: z.number().int().nonnegative(),
    expires_in: z.number().int().nonnegative(),
    token_type: z.literal("bearer"),
});

export type Login = z.infer<typeof LoginSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Register = z.infer<typeof RegisterSchema>;