import { NextRequest, NextResponse } from "next/server";

export async function logMiddleware(
    request: NextRequest
): Promise<NextResponse | undefined> {

    console.log(
        `[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`
    );

    return;
}