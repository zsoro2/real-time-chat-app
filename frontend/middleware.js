import { NextResponse } from "next/server";

const auth_protected_paths = ["/chat"];
const guest_protected_paths = ["/login", "/register"];

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  if (guest_protected_paths.includes(path) && token.length > 0) {
    return NextResponse.redirect(new URL("/chat", request.nextUrl));
  }
  if (auth_protected_paths.includes(path) && !token.length > 0) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}
