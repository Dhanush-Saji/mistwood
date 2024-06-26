export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'
 

export async function middleware(request) {
  const token = await getToken({req:request})
  const url = request.nextUrl
  if(!token && (url.pathname.startsWith('/cart') || url.pathname.startsWith('/orders'))){
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next();
}
 

export const config = {
  matcher: ['/cart','/orders'],
}