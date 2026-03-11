import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get students missing sacraments (not DROPPED status and missing baptism or first eucharist)
    const students = await prisma.catechism_students.findMany({
      where: {
        NOT: { status: 'DROPPED' },
        OR: [
          { has_baptism: false },
          { has_first_eucharist: false },
        ],
      },
      include: {
        catechism_classes: true,
      },
    })

    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
