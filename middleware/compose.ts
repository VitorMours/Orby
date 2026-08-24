import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFn } from "./types";

export async function runMiddlewares( request: NextRequest, middlewares: MiddlewareFn[] ): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  for (const mw of middlewares) {
    const result = await mw(request, response);
    response = result.response;
    if (!result.proceed) return response;
  }

  return response;
}