import { auth } from "@/lib/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = req.auth?.user?.role
  const { pathname } = nextUrl

  const isProtectedRoute = pathname.startsWith("/admin") || 
                         pathname.startsWith("/padre") || 
                         pathname.startsWith("/catequese")

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return Response.redirect(new URL("/login", nextUrl))
  }

  if (pathname.startsWith("/padre") && !["ADMIN", "PADRE"].includes(role || "")) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  if (pathname.startsWith("/catequese") && !["ADMIN", "CATEQUISTA"].includes(role || "")) {
    return Response.redirect(new URL("/login", nextUrl))
  }
})

export const config = {
  matcher: ["/admin/:path*", "/padre/:path*", "/catequese/:path*"],
}