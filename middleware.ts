import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  console.log("Middleware path:: ", path);

  const cookie = (await cookies()).get("session")?.value
  console.log("Cookie:: ", cookie);

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}