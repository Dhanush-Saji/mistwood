import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  return NextResponse.next();
}
