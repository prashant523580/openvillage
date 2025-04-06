import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { auth as Authorization } from "./auth";
// import { auth } from "./auth";

const protectedRoute = ["/admin/dashboard", "/admin/projects", "/admin/users"];
// const allowedOrigins = process.env.NODE_ENV == "production" ?
//     [
//         "https://bhoj24.com",
//         "https://www.bhoj24.com",
//         "https://bhoj24.vercel.app"

//     ] :
//     [
//         "http://localhost:3000",
//         "http://192.168.1.80:3000"
//     ]

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
    console.log(session)
    // Redirect unauthenticated users trying to access protected routes
    if (session?.user?.role !== "ADMIN" && isProtected) {
        const absoluteUrl = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl);
    }
})
// export default async function middleware(request: NextRequest) {
//     // Get the session
//     const session = await auth();

//     const isProtected = protectedRoute.some((route) =>
//         request.nextUrl.pathname.startsWith(route)
//     );
//     console.log(session)
//     // Redirect unauthenticated users trying to access protected routes
//     if (session?.user?.role !== "ADMIN" && isProtected) {
//         const absoluteUrl = new URL("/", request.nextUrl.origin);
//         return NextResponse.redirect(absoluteUrl);
//     }

//     // Handle CORS
//     // const origin = request.headers.get("origin"); // Get origin of the request
//     // console.log({origin})
//     // const response = NextResponse.next();
//     // if (origin && allowedOrigins.includes(origin)) {
//     //     response.headers.set("Access-Control-Allow-Origin", origin);
//     //     response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     //     response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

//     //     // Handle preflight requests

//     //     return response;
//     // }

//     // // Block requests from other origins
//     // if (origin) {
//     //     return new NextResponse("CORS Error: Unauthorized Origin", { status: 403 });
//     // }
//     // if (request.method === "OPTIONS") {
//     //     return response;
//     // }

//     return NextResponse.next();
// }

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        // "/((?!api|_next/static|_next/image|favicon.ico).*)",
        // "/api/:path*"
    ],
};
