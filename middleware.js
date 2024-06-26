import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/shop") {
    return NextResponse.next();
  }
  const isProtectedRoute = pathname.startsWith("/cart") || pathname.startsWith("/shop/");
  if ( isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
