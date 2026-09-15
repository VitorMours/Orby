import AuthService from "@/lib/auth/auth.service";
import NoteService from "@/lib/notes/note.service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await AuthService.getSession();

        if (!user) {
            return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
        }

        const notes = await NoteService.getNotes(user.id);
        return NextResponse.json({ status: 200, data: notes });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Erro interno" },
            { status: 500 }
        );
    }
}
