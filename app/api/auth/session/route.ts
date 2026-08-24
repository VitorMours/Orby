import AuthService from "@/lib/auth/auth.service";
import { NextResponse } from "next/server";

/**
 * Verifica a existência de sessão funcional do usuario  
 * 
 * Recebe os dados do usuario por meio do request seguindo
 * a validação por meio do {@link Session}
 * 
 * @param request 
 */
export async function GET(request: Request) {
  try {
    const user = await AuthService.getSession();
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 401 }
    );
  }
}