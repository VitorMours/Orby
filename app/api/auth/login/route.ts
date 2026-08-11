import { NextResponse } from "next/server";
import AuthService from "@/features/auth/auth.service";
import TokenService from "@/features/auth/jwt.service";
import { Session } from "@/features/auth/token.schema";
import { LoginSchema } from "@/features/auth/auth.schema";

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
        const response = NextResponse.json(loginResult, { status: 200 });
        return TokenService.extractToken(response, loginResult.session as Session);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}