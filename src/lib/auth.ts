import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { promisify } from "util"

const scryptAsync = promisify(crypto.scrypt) as (
  password: crypto.BinaryLike,
  salt: crypto.BinaryLike,
  keylen: number,
  options: crypto.ScryptOptions
) => Promise<Buffer>

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Se for hash do bcrypt (padrão NextAuth atual)
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) {
    return bcrypt.compare(password, hash)
  }

  // Se for hash do scrypt (AdonisJS/Lucid antigo)
  if (hash.startsWith("$scrypt$")) {
    try {
      const parts = hash.split("$")
      const params: Record<string, number> = {}
      parts[3].split(",").forEach(p => {
        const [k, v] = p.split("=")
        params[k] = parseInt(v)
      })

      const salt = Buffer.from(parts[4], "base64")
      const storedHash = Buffer.from(parts[5], "base64")

      // No AdonisJS o keyLength padrão costuma ser 64
      const derivedKey = (await scryptAsync(
        password,
        salt,
        storedHash.length,
        {
          N: params.n,
          r: params.r,
          p: params.p,
        }
      )) as Buffer

      return crypto.timingSafeEqual(storedHash, derivedKey)
    } catch {
      return false
    }
  }

  return false
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }


        const user = await prisma.users.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) {
          return null
        }


        const valid = await verifyPassword(
          credentials.password as string,
          user.password
        )

        if (!valid) {
          return null
        }


        return {
          id: String(user.id),
          email: user.email,
          name: user.full_name || "",
          role: user.role
        }
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
      }
      return session
    }
  },

  pages: {
    signIn: "/login"
  }
})