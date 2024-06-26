import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const session = await getSession({ req });
  const { pathname } = req.nextUrl;

  if (pathname === "/shop" && session) {
    return NextResponse.next();
  }
  const isProtectedRoute = pathname.startsWith("/cart") || pathname.startsWith("/shop/");
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
