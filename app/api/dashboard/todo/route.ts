import { NextResponse } from "next/server";

// FIXME - Fazer rota em vias de fatos
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