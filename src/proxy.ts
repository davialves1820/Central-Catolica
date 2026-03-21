import NextAuth from "next-auth";
import { authConfig } from "@/lib/server/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const pastorals = req.auth?.user?.pastorals || [];
  const { pathname } = nextUrl;

  const isProtectedRoute = pathname.startsWith("/catequese");

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  const isCrismaCoordinator = pastorals.some(
    (p: { slug: string; role: string }) => p.slug === "crisma" && p.role === "COORDENADOR"
  );
  const isAuthorizedRole = ["ADMIN", "PADRE"].includes(role || "");

  // Se estiver acessando catequese e não for admin ou coordenador da crisma
  if (isProtectedRoute && !isAuthorizedRole && !isCrismaCoordinator) {
    return Response.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  matcher: ["/catequese/:path*"],
};
