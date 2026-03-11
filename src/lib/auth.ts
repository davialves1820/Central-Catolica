import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

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

        console.log(`[AUTH] Tentativa de login para: ${credentials.email}`)

        const user = await prisma.users.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) {
          console.warn(`[AUTH] Usuário não encontrado: ${credentials.email}`)
          return null
        }

        console.log(`[AUTH] Usuário encontrado. Comparando senha...`)

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!valid) {
          console.warn(`[AUTH] Senha inválida para: ${credentials.email}`)
          // Se soubermos o prefixo do hash, podemos logar para entender o tipo (SÓ PARA DEBUG)
          console.log(`[DEBUG] Hash no banco: ${user.password.substring(0, 10)}...`)
          return null
        }

        console.log(`[AUTH] Login bem sucedido: ${credentials.email}`)

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