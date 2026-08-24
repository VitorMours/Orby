import { NextResponse } from "next/server";
import AuthService from "@/lib/auth/auth.service";
import { LoginSchema } from "@/lib/auth/auth.schema";

/**
 * Autentica um usuário através de suas credenciais.
 *
 * Recebe o email e a senha enviados no corpo da requisição,
 * valida os dados utilizando o {@link LoginSchema} e delega
 * o processo de autenticação ao {@link AuthService}.
 *
 * @route POST /api/auth/login
 *
 * @param request - Requisição HTTP contendo as credenciais do usuário
 *                  no corpo em formato JSON.
 *
 * @returns Uma resposta HTTP contendo os dados da sessão e do usuário
 *          autenticado.
 *
 * @throws {400} Quando os dados enviados não são válidos.
 * @throws {500} Quando ocorre um erro durante o processo de autenticação.
 *
 * @example
 * Requisição:
 * ```json
 * {
 *   "email": "usuario@email.com",
 *   "password": "123456"
 * }
 * ```
 *
 * @example
 * Resposta de sucesso:
 * ```json
 * {
 *   "user": {},
 *   "session": {}
 * }
 * ```
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedBody = LoginSchema.safeParse(body)
        if (!parsedBody.success) {
            return NextResponse.json({
                errors: parsedBody.error.flatten(),
            }, { status: 400 })
        }

        const loginResult = await AuthService.login(parsedBody.data);
        return NextResponse.json(loginResult, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}