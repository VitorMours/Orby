import { NextRequest, NextResponse } from "next/server";
import { runMiddlewares } from "./middleware/compose";
import { authMiddleware } from "./middleware/auth.middleware";
import { logMiddleware } from "./middleware/log.middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    return runMiddlewares(request, [logMiddleware, authMiddleware]);
  }

  if (pathname.startsWith("/public")) {
    return runMiddlewares(request, [logMiddleware]);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};