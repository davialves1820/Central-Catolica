import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        full_name: fullName || email,
        role: "FIEL",
        created_at: new Date(),
      },
    })

    // Remove password from response
    const userWithoutPassword = { ...user } as any
    delete userWithoutPassword.password

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
