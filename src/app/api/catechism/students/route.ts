import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { classId, name, hasBaptism, hasFirstEucharist } = data

    const newStudent = await prisma.catechism_students.create({
      data: {
        class_id: classId,
        name,
        has_baptism: hasBaptism || false,
        has_first_eucharist: hasFirstEucharist || false,
      },
    })

    return NextResponse.json(newStudent, { status: 201 })
  } catch (error) {
    console.error("Error adding student:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}