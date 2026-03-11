import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const classId = Number(id)

  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const classDetails = await prisma.catechism_classes.findUnique({
      where: { id: classId },
      include: {
        users: true,
        catechism_students: { include: { attendances: true } },
        attendances: true,
      },
    })

    if (!classDetails) return NextResponse.json({ error: "Class not found" }, { status: 404 })

    const studentsWithFrequency = classDetails.catechism_students.map(student => {
      const total = student.attendances.length
      const present = student.attendances.filter(a => a.present).length
      const frequency = total > 0 ? Math.round((present / total) * 100) : 0

      return { ...student, frequency }
    })

    return NextResponse.json({ ...classDetails, catechism_students: studentsWithFrequency })
  } catch (error) {
    console.error("Error fetching class details:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await context.params
    const classId = Number(id)
    if (isNaN(classId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 })

    const { name, year, catechistId } = await request.json()

    const updatedClass = await prisma.catechism_classes.update({
      where: { id: classId },
      data: { name, year, catechist_id: catechistId },
    })

    return NextResponse.json(updatedClass)
  } catch (error) {
    console.error("Error updating class:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}