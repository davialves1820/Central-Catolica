import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const classes = await prisma.catechism_classes.findMany({
      include: {
        users: true, // catechist
        catechism_students: true,
        attendances: true,
      },
    })

    return NextResponse.json(classes)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { name, year, catechistId } = data

    const newClass = await prisma.catechism_classes.create({
      data: {
        name,
        year,
        catechist_id: catechistId,
      },
    })

    return NextResponse.json(newClass, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { id, name, year, catechistId } = data

    if (!id) {
      return NextResponse.json({ error: "Class id is required" }, { status: 400 })
    }

    const updatedClass = await prisma.catechism_classes.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        year,
        catechist_id: catechistId,
      },
    })

    return NextResponse.json(updatedClass)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}