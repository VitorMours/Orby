import AuthService from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try{
        const body = await request.json();
        const serviceResult = await AuthService.register(body);
        return NextResponse.json(serviceResult, { status: 201 });

    } catch(error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Erro interno" }, 
            { status: 500 }
        );
    }
}