// middleware/auth.middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFn } from "./types";
import { createSupabaseServer } from "@/lib/supabase";
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

        const token = request.cookies.get("session_token")?.value;


        return { response, proceed: true };
    }catch(error){
        return { response, proceed: false };
    }
}