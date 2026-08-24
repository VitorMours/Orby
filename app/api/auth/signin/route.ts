import AuthService from "@/lib/auth/auth.service";
import { NextResponse } from "next/server";

/**
 * Cria uma nova conta de usuário.
 *
 * Recebe os dados de cadastro enviados no corpo da requisição
 * e delega a criação da conta ao {@link AuthService}.
 *
 * @route POST /api/auth/register
 *
 * @param request - Requisição HTTP contendo os dados necessários
 *                  para criação da conta em formato JSON.
 *
 * @returns
 * - `201` - Usuário criado com sucesso.
 * - `500` - Erro interno durante o processo de criação da conta.
 *
 * @example
 * Requisição:
 * ```json
 * {
 *   "email": "usuario@email.com",
 *   "password": "123456",
 *   "name": "João"
 * }
 * ```
 *
 * @example
 * Resposta de sucesso:
 * ```json
 * {
 *   "id": "uuid-do-usuario",
 *   "email": "usuario@email.com"
 * }
 * ```
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const serviceResult = await AuthService.register(body);

        return NextResponse.json(
            serviceResult,
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro interno",
            },
            { status: 500 }
        );
    }
}