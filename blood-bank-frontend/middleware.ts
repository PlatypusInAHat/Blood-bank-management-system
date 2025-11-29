import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Các đường dẫn không cần xác thực
  const publicPaths = ["/login", "/forgot-password", "/reset-password"]
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Lấy token từ cookie
  const token = request.cookies.get("token")?.value

  // Nếu đường dẫn là public, cho phép truy cập
  // (nhưng nếu có token, redirect tới dashboard)
  if (isPublicPath) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Nếu không có token và không phải đường dẫn public, redirect tới login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Cho phép truy cập nếu có token
  return NextResponse.next()
}

// Chỉ áp dụng middleware cho các đường dẫn sau
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

