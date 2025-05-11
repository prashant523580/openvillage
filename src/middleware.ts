import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoute = ["/admin/dashboard", "/admin/projects", "/admin/users"];


import {authConfig} from "./auth.config"
import NextAuth from "next-auth"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
      const session = await auth();

    const isProtected = protectedRoute.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );
    // console.log(session)
    // Redirect unauthenticated users trying to access protected routes
    if (session?.user?.role !== "ADMIN" && isProtected) {
        const absoluteUrl = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl);
    }
})
