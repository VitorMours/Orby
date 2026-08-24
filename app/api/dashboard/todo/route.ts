import { NextResponse } from "next/server";



/**
 * Rota para busca dos elementos de todo dentro do sistema
 * @param request 
 * 
 * Recebe os dados do usuário e envia para o service, verificando os headers presentes,
 * a presença do token de autenticação
 */
export async function GET(request: Request) {
    try {
        return NextResponse.json({ status: 200 });
    
    
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