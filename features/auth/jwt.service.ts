import { Session } from "@/features/auth/token.schema";
import { NextResponse } from "next/server";

class TokenService {
    public static extractToken(response: NextResponse, session: Session) {
        if (!session?.access_token) {
            return response;
        }

        response.cookies.set("token", session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
        });

        return response;
    }

    public static validateToken() { }

    public static updateToken() { }
}

export default TokenService;