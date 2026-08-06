import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/auth.middleware";
import { logMiddleware } from "./middleware/log.middleware";

export async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    if (pathName.startsWith("/dashboard")) {
        const auth = await authMiddleware(request);
        if (auth) return auth;

        const log = await logMiddleware(request);
        if (log) return log;
    }

    if (pathName.startsWith("/public")) {
        const log = await logMiddleware(request);
        if (log) return log;
    }

    return NextResponse.next();
}