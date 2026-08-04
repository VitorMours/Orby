import { NextResponse } from "next/server";
import { UserSchema } from "@/schemas/user";
import { createUser } from "@/services/user.services";

export async function POST(request: Request) {

    try{
        const body = await request.json();
        const serviceResult = await createUser(body.user);
        return NextResponse.json(serviceResult, { status: 201 });

    } catch(error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Erro interno" }, 
            { status: 500 }
        );
    }
}