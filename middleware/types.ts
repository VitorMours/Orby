import { NextRequest, NextResponse } from "next/server";

export type MiddlewareResult = {
  response: NextResponse;
  proceed: boolean; // false = interrompe a cadeia (redirect, 401, etc.)
};

export type MiddlewareFn = (
  request: NextRequest,
  response: NextResponse
) => Promise<MiddlewareResult>;