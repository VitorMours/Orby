import { LoginSchema } from "@/schemas/auth.schema";
import AuthService from "@/services/auth.service";
import { NextResponse } from "next/server";

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