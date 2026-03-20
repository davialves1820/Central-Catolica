import { auth } from "@/lib/server/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const { pathname } = nextUrl;

  const isProtectedRoute = pathname.startsWith("/catequese");

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Se estiver logado mas não for CATEQUISTA ou ADMIN, redireciona para home
  if (
    pathname.startsWith("/catequese") &&
    !["ADMIN", "CATEQUISTA"].includes(role || "")
  ) {
    return Response.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  matcher: ["/catequese/:path*"],
};
