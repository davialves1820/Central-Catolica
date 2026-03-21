import { type DefaultSession, type NextAuthConfig, type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      emailVerified: Date | null;
      pastorals: { id: string; role: string; slug: string }[];
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role: string;
    emailVerified: Date | null;
    pastorals: { id: string; role: string; slug: string }[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    emailVerified: Date | null;
    pastorals: { id: string; role: string; slug: string }[];
  }
}

export const authConfig = {
  providers: [], // We'll add credentials in auth.ts because it uses prisma
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.emailVerified = user.emailVerified;
        token.pastorals = user.pastorals;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role;
        session.user.emailVerified = token.emailVerified;
        session.user.pastorals = token.pastorals || [];
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
