import { NextResponse, NextRequest} from "next/server";


export async function authMiddleware(request: NextRequest) {
    const token = request.cookies.get("token");

    if(!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}