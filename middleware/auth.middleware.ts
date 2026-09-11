// middleware/auth.middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFn } from "./types";
import { createSupabaseMiddlewareClient } from "@/lib/supabase-middleware";
import { NextURL } from "next/dist/server/web/next-url";

function isPublicPath(path: NextURL): boolean {
    if (path.pathname.startsWith("/dashboard")) return false;
    return true;
}

export const authMiddleware: MiddlewareFn = async (request: NextRequest, response: NextResponse) => {
    try {
        const pathName = request.nextUrl;
        if(isPublicPath(pathName)){
            return { response, proceed: true };
        }


            const supabase = createSupabaseMiddlewareClient(request, response);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                const loginUrl = request.nextUrl.clone();
                loginUrl.pathname = "/auth/login";
                loginUrl.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
                return {
                    response: NextResponse.redirect(loginUrl),
                    proceed: false,
                };
            }

        return { response, proceed: true };
    }catch(error){
            const loginUrl = request.nextUrl.clone();
            loginUrl.pathname = "/auth/login";
            loginUrl.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
            return {
                response: NextResponse.redirect(loginUrl),
                proceed: false,
            };
    }
}