import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    // Getting the pathname from the url
     const path = request.nextUrl.pathname;

     const isPathPublic = path === '/login' || path==="/signup" || path === "/verifyemail"

     const token = request.cookies.get('token') ?.value || "";

     if(isPathPublic && token){
        return NextResponse.redirect(new URL(
            "/profile", request.nextUrl
        ))
    }

     if(!isPathPublic && !token){
        return NextResponse.redirect(new URL(
            "/login",
            request.nextUrl
        ))
     }
} 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyemail"
  ],
}