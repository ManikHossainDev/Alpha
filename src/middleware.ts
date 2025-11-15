import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get token from cookie using the "persist:auth" format
  const persistAuthCookie = request.cookies.get("persist:auth")?.value;
  let token = null;

  if (persistAuthCookie) {
    try {
      const authData = JSON.parse(persistAuthCookie);
      token = authData.token;
    } catch (error) {
      console.error(
        "Error parsing auth data from cookie in middleware:",
        error,
      );
    }
  }

  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];

  const isPublicRoute = publicRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute && token && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
