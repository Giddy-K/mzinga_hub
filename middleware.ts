import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // No token – redirect to login
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  // Redirect to home if role mismatch
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/user") && token?.role !== "user") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Handle /admin/dashboard
  if (pathname.startsWith('/admin')) {
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  // Handle /user/dashboard
  if (pathname.startsWith('/user')) {
    if (token?.role !== 'user') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
