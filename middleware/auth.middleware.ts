// middleware/auth.middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFn } from "./types";
import { createSupabaseServer } from "@/lib/supabase";

export const authMiddleware: MiddlewareFn = async (request: NextRequest, response: NextResponse) => {

  

}