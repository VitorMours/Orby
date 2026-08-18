// app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import AuthService from "@/features/auth/auth.service";

export async function POST() {
    try {
        await AuthService.logout();

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Erro ao realizar logout",
            },
            { status: 500 }
        );
    }
}