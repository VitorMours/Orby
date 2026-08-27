import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFn } from "./types";

export const requestMiddleware: MiddlewareFn = async (request: NextRequest, response: NextResponse) => {

    return { response, proceed: true };
}