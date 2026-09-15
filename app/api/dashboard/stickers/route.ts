import AuthService from "@/lib/auth/auth.service";
import StickService from "@/lib/sticks/stick.service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await AuthService.getSession();

        if (!user) {
            return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
        }

        const sticks = await StickService.getSticks(user.id);
        return NextResponse.json({ status: 200, data: sticks });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Erro interno" },
            { status: 500 }
        );
    }
}
