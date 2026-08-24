import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFn } from "./types";

export const logMiddleware: MiddlewareFn = async (request: NextRequest, response: NextResponse) => {
  console.log(`[${request.method}] ${request.nextUrl.pathname}`);
  return { response, proceed: true };
};